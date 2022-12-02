import { Color, Move, Position, Square } from ".";
import { King } from "./Pieces";

class Board {
    public position: Position;

    public toPlay: Color;

    public legalMoves: Move[] = [];

    constructor(position: Position, toPlay: Color) {
        this.position = position;
        this.toPlay = toPlay;
        this._setLegalMoves(toPlay);
    }

    isLegal(move: Move): boolean {
        return this.legalMoves.findIndex(lm => lm.equals(move)) > -1;
    }

    applyMove(move: Move) {
        this.position.applyMove(move);
        this.toPlay = this.toPlay.opposite;
        this._setLegalMoves(this.toPlay);
    }

    _setLegalMoves(color: Color) {
        const potentialMoves = this.position.potentialMoves.getByColor(color);

        this.legalMoves = potentialMoves.filter(pm => {
            const possiblePosition = new Position(this.position.pieces.map(p => p.copy()));
            possiblePosition.applyMove(pm);

            if (possiblePosition.isKingUnderCheck(color)) return false;

            if (this._isCastle(pm)) return this._isCastleMoveLegal(pm);

            return true;
        });
    }

    _isCastle(move: Move): boolean {
        const piece = this.position.getPiece(move.start);

        if (!(piece instanceof King)) return false;

        return Math.abs(move.end.minus(move.start).x) === 2;
    }

    _isCastleMoveLegal(move: Move) {
        // Can't castle if under check
        if (this.position.isThreatened(this.toPlay, move.start)) return false;

        // Can't castle if crossing through a check
        const deltaX = move.end.minus(move.start).x > 0 ? 1 : -1;
        const crossingSquare = move.start.plus(new Square(deltaX, 0));

        if (this.position.isThreatened(this.toPlay, crossingSquare)) return false;

        return true;
    }
}

export default Board;