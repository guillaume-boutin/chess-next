import { Move, Position, Square } from "..";

class EnPassantRules {
    private _move: Move;
    private _position: Position;

    constructor(move: Move, position: Position) {
        this._move = move;
        this._position = position;
    }

    get move(): Move {
        return this._move;
    }

    get position(): Position {
        return this._position;
    }

    // get step(): Square {
    //     return this.
    // }

    attemptingEnPassant(): boolean {
        if (!this.position.getPiece(this.move.start).isPawn) return false;

        const diff = this.move.end.minus(this.move.start);
        if (Math.abs(diff.x) !== 1 || Math.abs(diff.y) !== 1) return false;

        return this.position.getPiece(this.move.end).isNull;
    }

    apply(): Position {
        const opponentPawnSquare = this.move.start.plus(new Square(this.move.step.x, 0));

        return this.position
            .removeAt(opponentPawnSquare)
            .apply(this.move);
     }
}

export default EnPassantRules;