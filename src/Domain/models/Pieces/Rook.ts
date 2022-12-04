import { Piece } from ".";
import { Color, Position, Square } from "..";
import { PieceType } from "../../enums/PieceType";

class Rook {
    static white(x: number, y: number): Piece {
        return new Piece(Color.white(), PieceType.ROOK, new Square(x, y));
    }

    static black(x: number, y: number): Piece {
        return new Piece(Color.black(), PieceType.ROOK, new Square(x, y));
    }
}

export default Rook;