import { Piece } from ".";
import { Color, Position, Square } from "..";
import { PieceType } from "../../enums/PieceType";

class King {
    static white(x: number, y: number): Piece {
        return new Piece(Color.white(), PieceType.KING, new Square(x, y));
    }

    static black(x: number, y: number): Piece {
        return new Piece(Color.black(), PieceType.KING, new Square(x, y));
    }
}

export default King;