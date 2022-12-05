import { Color, Move, Position } from "..";
import { PieceType } from "../../enums/PieceType";
import { Piece } from "../Pieces";

export class PromotionRules {
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

    get piece(): Piece {
        return this.position.getPiece(this.move.start);
    }

    attemptingPromotion(): boolean {
        const piece = this.position.getPiece(this.move.start);

        if (!piece.isPawn) return false;

        if (this.move.promotion === PieceType.NULL) return false;

        if (piece.color.equals(Color.white())) return this.move.end.y === 8;

        if (piece.color.equals(Color.black())) return this.move.end.y === 1;

        return true;
    }

    apply() {
        const pawn = this.position.getPiece(this.move.start);

        return this.position
            .removeAt(this.move.start)
            .addPiece(new Piece(pawn.color, this.move.promotion, this.move.end));
    }
}

export default PromotionRules;