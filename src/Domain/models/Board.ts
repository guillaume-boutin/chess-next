import { Move, Position } from ".";

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
}

export default Board;