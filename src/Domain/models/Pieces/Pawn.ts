import { Piece } from ".";
import { Square } from "..";

class Pawn extends Piece {
    constructor(color: string, square: Square) {
        super(color, "pawn", square);
    }
}

export default Pawn;