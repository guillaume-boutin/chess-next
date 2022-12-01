import { Move, Position, Square } from ".";

class Board {
    public position: Position;

    constructor(position: Position) {
        this.position = position;
    }

    isLegal(move: Move): boolean {
        return true;
    }

    applyMove(move: Move) {
        this.position.applyMove(move);
    }

    punch() {}
}

export default Board;