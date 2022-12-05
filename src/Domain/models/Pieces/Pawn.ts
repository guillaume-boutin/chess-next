import { Piece } from ".";
import { Color, Square } from "..";
import { PieceType } from "../../enums/PieceType";

class Pawn {
    static white(x: number, y: number): Piece {
        return new Piece(Color.white(), PieceType.PAWN, new Square(x, y));
    }

    static black(x: number, y: number): Piece {
        return new Piece(Color.black(), PieceType.PAWN, new Square(x, y));
    }
}

export default Pawn;