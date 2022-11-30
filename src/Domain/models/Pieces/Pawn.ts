import { Piece } from ".";
import { Color, Move, Position, Square } from "..";
import { PieceType } from "../../enums/PieceType";

class Pawn extends Piece {
    constructor(color: Color, square: Square) {
        super(color, square);
    }

    get type(): PieceType {
        return PieceType.PAWN;
    }
}

export default Pawn;