import { Piece } from ".";

class Pawn extends Piece {
    constructor(color: string, square: { x: number, y: number }) {
        super(color, "pawn", square);
    }
}

export default Pawn;