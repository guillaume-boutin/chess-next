import { Piece } from "./Pieces";

class Position {
    public pieces: Piece[];

    constructor () {
        this.pieces = initialPosition();
    }
}

const initialPosition = (): Piece[] => {
    return [
        new Piece("white", "king", { x: 5, y: 1 }),
        new Piece("black", "queen", { x: 4, y: 8 }),
    ];
}

export default Position;