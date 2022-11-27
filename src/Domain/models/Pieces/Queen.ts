import { Piece } from ".";
import { Square } from "..";

class Queen extends Piece {
    constructor(color: string, square: Square) {
        super(color, "queen", square);
    }
}

export default Queen;