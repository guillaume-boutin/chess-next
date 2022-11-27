import { Piece } from ".";
import { Color, Square } from "..";
import { PieceType } from "../../enums/PieceType";

class King extends Piece {
    constructor(color: Color, square: Square) {
        super(color, square);
    }

    get type(): PieceType {
        return PieceType.KING;
    }
}

export default King;