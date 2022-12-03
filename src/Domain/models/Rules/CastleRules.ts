import { Move, Position, Square } from "..";
import { King, Piece } from "../Pieces";

class CastleRules {
    private _move: Move;
    private _position: Position;
    private _piece: Piece;
    private _diff: number;
    private _direction: -1 | 1;

    constructor(move: Move, position: Position) {
        this._move = move;
        this._position = position;
        this._piece = this._position.getPiece(move.start);
        this._diff = move.end.minus(move.start).x;
        this._direction = this._diff > 0 ? 1 : -1;
    }

    get rookStartSquare(): Square {
        return new Square(
            this._direction > 0 ? 8 : 1,
            this._move.start.y
        );
    }

    get rookEndSquare(): Square {
        return new Square(
            this._move.start.x + this._direction,
            this._move.start.y
        )
    }

    isCastle(): boolean {
        if (!(this._piece instanceof King)) return false;

        return Math.abs(this._diff) == 2;
    }

    isLegal() {
        if (!this.isCastle) return false;

        // Can't castle if under check
        if (this._position.isThreatened(this._piece.color, this._move.start)) return false;

        // Can't castle if crossing through a check
        const crossingSquare = this._move.start.plus(new Square(this._diff, 0));

        if (this._position.isThreatened(this._piece.color, crossingSquare)) return false;

        return true;
    }
}

export default CastleRules;