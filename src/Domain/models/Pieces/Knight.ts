import { Piece } from ".";
import { Square } from "..";

class Knight extends Piece {
    constructor(color: string, square: Square) {
        super(color, "knight", square);
    }
}

export default Knight;