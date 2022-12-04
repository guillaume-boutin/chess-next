import Color from "./Color";
import { King, Piece } from "./Pieces";
import { Move, PotentialMoves, Square } from ".";
import { CastleRules } from "./Rules";

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
        let pieces = this._copyPieces();

        pieces = this._removePiece(move.end, pieces);
        pieces = this._movePiece(move, pieces);

        return new Position(pieces, move);
    }

    isOccupied(square: Square) {
        return !this.getPiece(square).isNull;
    }


    isOccupiedByColor(color: Color, square: Square) {
        const piece = this.getPiece(square);
        if (piece.isNull) return false;

        return piece.color.equals(color);
    }

    private _copyPieces(): Piece[] {
        return this.pieces.map(piece => piece.copy());
    }

    private _movePiece(move: Move, pieces: Piece[]): Piece[] {
        const index = pieces.findIndex(p => p.square.equals(move.start));
        if (index === -1) return pieces;

        return [
            ...pieces.slice(0, index),
            pieces[index].move(move.end),
            ...pieces.slice(index+1)
        ];
    }

    private _removePiece(square: Square, pieces: Piece[]): Piece[] {
        const index = pieces.findIndex(p => p.square.equals(square));
        if (index === -1) return pieces;

        return [ ...pieces.slice(0, index), ...pieces.slice(index+1) ];
    }
}

export default Position;