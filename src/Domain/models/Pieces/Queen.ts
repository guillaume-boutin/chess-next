import { Piece } from ".";

class Queen extends Piece {
    constructor(color: string, square: { x: number, y: number }) {
        super(color, "queen", square);
    }
}

export default Queen;