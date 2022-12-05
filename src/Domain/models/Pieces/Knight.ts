import { Piece } from ".";
import { Color, Square } from "..";
import { PieceType } from "../../enums/PieceType";

class Knight {
    static white(x: number, y: number): Piece {
        return new Piece(Color.white(), PieceType.KNIGHT, new Square(x, y));
    }

    static black(x: number, y: number): Piece {
        return new Piece(Color.black(), PieceType.KNIGHT, new Square(x, y));
    }
}

export default Knight;