import { Piece } from ".";
import { Color, Position, Square } from "..";
import { PieceType } from "../../enums/PieceType";

class Queen {
    static white(x: number, y: number): Piece {
        return new Piece(Color.white(), PieceType.QUEEN, new Square(x, y));
    }

    static black(x: number, y: number): Piece {
        return new Piece(Color.black(), PieceType.QUEEN, new Square(x, y));
    }
}

export default Queen;