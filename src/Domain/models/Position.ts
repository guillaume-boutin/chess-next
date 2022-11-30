import Color from "./Color";
import { Piece } from "./Pieces";
import { Move, Square } from ".";

class Position {
    public pieces: Piece[];

    public lastMove: Move = Move.null();

    constructor (pieces: Piece[]) {
        this.pieces = pieces;
    }

    applyMove(move: Move): Position {
        let piece = this.getPiece(move.start);
        if (piece.isNull) return this;

        this.removePiece(move.end);
        const index = this.pieces.findIndex(p => p.square.equals(move.start));

        piece = this.pieces[index];
        piece.move(move.end);
        this.pieces[index] = piece;
        this.lastMove = move;

        return this;
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
}

export default Position;