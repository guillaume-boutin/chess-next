import { Piece } from "./Pieces";

class Board {
    public pieces: Piece[];

    constructor(pieces: Piece[]) {
        this.pieces = pieces;
    }
}

export default Board;