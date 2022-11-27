import { Piece } from ".";
import { Square } from "..";

class King extends Piece {
    constructor(color: string, square: Square) {
        super(color, "king", square);
    }
}

export default King;