import Color from "./Color";
import { King, Piece } from "./Pieces";
import { Move, PotentialMoves, Square } from ".";
import { CastleRules } from "./Rules";

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
        if (new CastleRules(move, this).isCastle()) return this._applyCastle(move);

        const piece = this.getPiece(move.start);
        this.removePiece(move.end);
        piece.move(move.end);
    }

    _applyCastle(move: Move) {
        const rules = new CastleRules(move, this);

        const rook = this.getPiece(rules.rookStartSquare);
        rook.move(rules.rookEndSquare);

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
}

export default Position;