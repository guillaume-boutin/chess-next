import Color from "./Color";
import { Piece } from "./Pieces";
import { Move, Square } from ".";
import { PieceType } from "../enums/PieceType";

class Position {
    private _pieces: Piece[];
    private _lastMove: Move;

    constructor(pieces: Piece[], lastMove?: Move) {
        this._pieces = pieces;
        this._lastMove = lastMove ?? Move.null();
    }

    get pieces(): Piece[] {
        return this._pieces;
    }

    get lastMove(): Move {
        return this._lastMove;
    }

    copy(): Position {
        return new Position(this._copyPieces(), this.lastMove.copy());
    }

    getPiece(square: Square): Piece {
        return this.pieces.find(p => p.square.equals(square)) ?? Piece.null();
    }

    apply(move: Move): Position {
        return this
            .removeAt(move.end)
            ._move(move);
    }

    isOccupied(square: Square) {
        return !this.getPiece(square).isNull;
    }

    isOccupiedByColor(color: Color, square: Square) {
        const piece = this.getPiece(square);
        if (piece.isNull) return false;

        return piece.color.equals(color);
    }

    removeAt(square: Square): Position {
        let pieces = this._copyPieces();
        const index = pieces.findIndex(p => p.square.equals(square));
        if (index === -1) return new Position(pieces, this.lastMove.copy());

        pieces = [ ...pieces.slice(-0, index), ...pieces.slice(index+1) ];

        return new Position(pieces, this.lastMove.copy())
    }

    addPiece(piece: Piece): Position {
        let position = this.removeAt(piece.square);

        return new Position([ ...position.pieces, piece ]);
    }

    private _copyPieces(): Piece[] {
        return this.pieces.map(piece => piece.copy());
    }

    private _move(move: Move): Position {
        let pieces = this._copyPieces();

        const index = pieces.findIndex(p => p.square.equals(move.start));
        if (index === -1) this;

        pieces = [
            ...pieces.slice(0, index),
            pieces[index].move(move.end),
            ...pieces.slice(index+1)
        ];

        return new Position(pieces, move);
    }
}

export default Position;