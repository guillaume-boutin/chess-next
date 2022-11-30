import { Move, Position, Square } from ".";

class Board {
    public position: Position;

    constructor(position: Position) {
        this.position = position;
    }

    isLegal(move: Move): boolean {
        return true;
    }

    applyMove(move: Move): Board {
        this.position = this.position.applyMove(move);

        return this;
    }
}

export default Board;