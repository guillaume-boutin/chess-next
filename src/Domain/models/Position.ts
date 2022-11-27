import Color from "./Color";
import { Piece } from "./Pieces";
import { Move, Square } from ".";

class Position {
    public pieces: Piece[];

    public lastMove: Move = Move.null();

    constructor (pieces: Piece[]) {
        this.pieces = pieces;
    }

    applyMove(move: Move) {
        const startPiece = this.getPiece(move.start);
        if (!startPiece) return;

        this.removePiece(move.end);
        this.movePiece(move);
        this.lastMove = move;
    }

    getPiece(square: Square): Piece | null {
        return this.pieces.find(p => p.square.equals(square)) || null;
    }

    removePiece(square: Square): void {
        var index = this.pieces.findIndex(p => p.square.equals(square));

        if (index === -1) return;

        let pieces = [ ...this.pieces ];
        pieces = [ ...pieces.slice(0, index), ...pieces.slice(index+1) ];
        this.pieces = pieces;
    }

    movePiece(move: Move): void {
        let index = this.pieces.findIndex(p => p.square.equals(move.start));

        if (index === -1) return;

        const piece = this.pieces[index];
        piece.square = move.end;
        piece.lastMove = move;
        this.pieces[index] = piece;
    }

    isOccupied(square: Square) {
        return this.getPiece(square) !== null;
    }

    isOccupiedByColor(color: Color, square: Square) {
        const piece = this.getPiece(square);

        if (! piece) return false;

        return piece.color.equals(color);
    }
}

export default Position;