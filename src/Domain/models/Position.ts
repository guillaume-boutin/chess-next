import Color from "./Color";
import { King, Piece } from "./Pieces";
import { Move, PotentialMoves, Square } from ".";

class Position {
    public pieces: Piece[];

    public lastMove: Move = Move.null();

    public potentialMoves: PotentialMoves;

    constructor (pieces: Piece[]) {
        this.pieces = pieces;
        this.potentialMoves = new PotentialMoves(this);
    }

    applyMove(move: Move) {
        this._applyPieceMove(move);
        this.lastMove = move;
        this.potentialMoves = new PotentialMoves(this);
    }

    _applyPieceMove(move: Move) {
        if (this.isCastle(move))
            return this._applyCastle(move);

        const piece = this.getPiece(move.start);
        this.removePiece(move.end);
        piece.move(move.end);
    }

    _applyCastle(move: Move) {
        const direction = move.end.minus(move.start).x > 0 ? 1 : -1;

        const rookStartSquare = new Square(direction > 0 ? 8 : 1, move.start.y);
        const rookEndSquare = move.start.plus(new Square(direction, 0));
        const rook = this.getPiece(rookStartSquare);
        rook.move(rookEndSquare);

        const king = this.getPiece(move.start);
        king.move(move.end);
    }

    getPiece(square: Square): Piece {
        return this.pieces.find(p => p.square.equals(square)) || Piece.null();
    }

    removePiece(square: Square): void {
        var index = this.pieces.findIndex(p => p.square.equals(square));

        if (index === -1) return;

        let pieces = [ ...this.pieces ];
        pieces = [ ...pieces.slice(0, index), ...pieces.slice(index+1) ];
        this.pieces = pieces;
    }

    isOccupied(square: Square) {
        return !this.getPiece(square).isNull;
    }

    isOccupiedByColor(color: Color, square: Square) {
        const piece = this.getPiece(square);

        if (piece.isNull) return false;

        return piece.color.equals(color);
    }

    isKingUnderCheck(color: Color) {
        const threateningMoves = this.potentialMoves.threateningFor(color);

        const king = this.pieces.find(piece => (piece instanceof King) && piece.color.equals(color)) || Piece.null();

        return threateningMoves.findIndex(move => move.end.equals(king.square)) > -1;
    }

    isThreatened(color: Color, square: Square): boolean {
        return this.potentialMoves
            .threateningFor(color)
            .findIndex(move => square.equals(move.end)) > -1;
    }

    isCastle(move: Move): boolean {
        const piece = this.getPiece(move.start);

        if (!(piece instanceof King)) return false;

        return Math.abs(move.end.minus(move.start).x) === 2;
    }
}

export default Position;