import { Piece } from ".";
import { Color, Position, Square } from "..";
import { PieceType } from "../../enums/PieceType";

class Knight extends Piece {
    constructor(color: Color, square: Square) {
        super(color, square);
    }

    get type(): PieceType {
        return PieceType.KNIGHT;
    }
}

export default Knight;