import Color from "./Color";
import { Pawn, Piece } from "./Pieces";
import { Move, Square } from ".";
import { PieceType } from "../enums/PieceType";

class Position {
    public pieces: Piece[];

    public lastMove: Move = Move.null();

    constructor (pieces: Piece[]) {
        this.pieces = pieces;
    }

    // applyMove(move: Move) {
    //     const startPiece = this.getPiece(move.start);
    //     if (!startPiece) return;

    //     this.removePiece(move.end);
    //     this.movePiece(move);
    //     this.lastMove = move;
    // }

    getPiece(square: Square): Piece {
        return this.pieces.find(p => p.square.equals(square)) || Piece.null();
    }

    // removePiece(square: Square): void {
    //     var index = this.pieces.findIndex(p => p.square.equals(square));

    //     if (index === -1) return;

    //     let pieces = [ ...this.pieces ];
    //     pieces = [ ...pieces.slice(0, index), ...pieces.slice(index+1) ];
    //     this.pieces = pieces;
    // }

    // movePiece(move: Move): void {
    //     let index = this.pieces.findIndex(p => p.square.equals(move.start));

    //     if (index === -1) return;

    //     const piece = this.pieces[index];
    //     piece.square = move.end;
    //     piece.lastMove = move;
    //     this.pieces[index] = piece;
    // }

    isOccupied(square: Square) {
        return !this.getPiece(square).isNull;
    }

    isOccupiedByColor(color: Color, square: Square) {
        const piece = this.getPiece(square);

        if (piece.isNull) return false;

        return piece.color.equals(color);
    }

    // isPawnCapturing(move: Move): boolean {
    //     const piece = this.getPiece(move.start);

    //     if (!(piece instanceof Pawn)) return false;

    //     return move.end.minus(move.start).x !== 0;
    // }
}

export default Position;