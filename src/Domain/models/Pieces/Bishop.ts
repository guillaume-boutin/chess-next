import { Piece } from ".";
import { Square } from "..";

class Bishop extends Piece {
    constructor(color: string, square: Square) {
        super(color, "bishop", square);
    }
}

export default Bishop;