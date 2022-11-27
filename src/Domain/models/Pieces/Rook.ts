import { Piece } from ".";
import { Square } from "..";

class Rook extends Piece {
    constructor(color: string, square: Square) {
        super(color, "rook", square);
    }
}

export default Rook;