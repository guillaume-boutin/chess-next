import { Piece } from ".";
import { Color, Position, Square } from "..";
import { PieceType } from "../../enums/PieceType";

class Queen extends Piece {
    constructor(color: Color, square: Square) {
        super(color, square);
    }

    get type(): PieceType {
        return PieceType.QUEEN;
    }
}

export default Queen;