import { Board, Position } from ".";
import Color from "./Color";
import Move from "./Move";

class Game {
    public toPlay: Color = Color.white();

    public board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    isLegal(move: Move): boolean {
        return this.board.isLegal(move);
    }

    tryMove(move: Move): Game {
        if (!this.isLegal(move)) return this;

        this.board = this.board.applyMove(move);

        this.punch();

        return this;
    }

    punch() {
        // this.toPlay = this.toPlay.opposite;

        // punch the clock

        // punch move in History
    }
}

export default Game;