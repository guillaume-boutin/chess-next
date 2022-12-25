import { Board } from ".";
import Color from "./Color";
import Move from "./Move";
import { MoveHistory } from "./MoveHistory";

class Game {
    public toPlay: Color = Color.white();

    public board: Board;

    public moveHistory: MoveHistory;

    constructor(board: Board) {
        this.board = board;
        this.moveHistory = new MoveHistory();
    }

    isLegal(move: Move): boolean {
        return this.board.isLegal(move);
    }

    tryMove(move: Move): boolean {
        if (!this.isLegal(move)) return false;

        this.board.applyMove(move);

        this.punch(move);
        return true;
    }

    punch(move: Move) {
        this.toPlay = this.toPlay.opposite;
        this.board.punch();

        // punch the clock

        // punch move in History
        this.moveHistory = this.moveHistory.write(move);

        console.log(this.moveHistory.turns);
    }
}

export default Game;