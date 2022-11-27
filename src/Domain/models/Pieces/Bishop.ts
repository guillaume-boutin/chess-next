import { Piece } from ".";

class Bishop extends Piece {
    constructor(color: string, square: { x: number, y: number }) {
        super(color, "bishop", square);
    }
}

export default Bishop;