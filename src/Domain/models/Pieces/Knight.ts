import { Piece } from ".";

class Knight extends Piece {
    constructor(color: string, square: { x: number, y: number }) {
        super(color, "knight", square);
    }
}

export default Knight;