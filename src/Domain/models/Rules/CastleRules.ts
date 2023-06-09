import { Move, Position, Square } from "..";
import { Piece } from "../Pieces";
import UnderCheckRules from "./UnderCheckRules";

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

    attemptingCastle(): boolean {
        if (!(this._piece.isKing)) return false;

        return Math.abs(this._diff) == 2;
    }

    isLegal() {
        if (!this.attemptingCastle()) return false;

        // Can't castle if king is under check
        if (new UnderCheckRules(this._piece.color, this._position).isUnderCheck()) return false;

        // Can't castle if crossing through a check
        const crossingSquare = this._move.start.plus(new Square(this._direction, 0));
        const newPosition = this._position.apply(
            new Move(this._move.start, crossingSquare)
        );
        if (new UnderCheckRules(this._piece.color, newPosition).isUnderCheck()) return false;

        return true;
    }

    apply(): Position {
        return this._position
            .apply(new Move(this.rookStartSquare, this.rookEndSquare))
            .apply(this._move);
    }
}

export default CastleRules;