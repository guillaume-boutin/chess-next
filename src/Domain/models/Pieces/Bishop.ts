import { Piece } from ".";
import { Color, Square } from "..";
import { PieceType } from "../../enums/PieceType";

class Bishop {
    static white(x: number, y: number): Piece {
        return new Piece(Color.white(), PieceType.BISHOP, new Square(x, y));
    }

    static black(x: number, y: number): Piece {
        return new Piece(Color.black(), PieceType.BISHOP, new Square(x, y));
    }
}

export default Bishop;