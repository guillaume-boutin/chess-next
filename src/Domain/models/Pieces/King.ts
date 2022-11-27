import { Piece } from ".";

class King extends Piece {
    constructor(color: string, square: { x: number, y: number }) {
        super(color, "king", square);
    }
}

export default King;