import { Square } from ".";
import { PieceType, PromotionType } from "../enums/PieceType";

class Move {
    public start: Square;
    public end: Square;
    public promotion: PromotionType;

    constructor(start: Square, end: Square, promotion?: PromotionType) {
        this.start = start;
        this.end = end;
        this.promotion = promotion ?? PieceType.NULL;
    }

    static null(): Move {
        return new Move(Square.null(), Square.null());
    }

    get isNull(): boolean {
        return this.equals(Move.null());
    }

    get step(): Square {
        return this.end.minus(this.start);
    }

    copy(): Move {
        return new Move(this.start.copy(), this.end.copy());
    }

    equals(move: Move): boolean {
        return this.start.equals(move.start)
            && this.end.equals(move.end)
            && this.promotion === move.promotion;
    }
}

export default Move;