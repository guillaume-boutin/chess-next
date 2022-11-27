import { Piece } from ".";

class Rook extends Piece {
    constructor(color: string, square: { x: number, y: number }) {
        super(color, "rook", square);
    }
}

export default Rook;