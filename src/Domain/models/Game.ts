import Color from "./Color";
import Move from "./Move";

class Game {
    public toPlay: Color = Color.white();

    isLegal(move: Move): boolean {
        return true;
    }

    tryMove(move: Move) {
        if (!this.isLegal(move)) return;

        // make move

        // punch
    }

    punch() {
        this.toPlay = this.toPlay.opposite;
    }
}

export default Game;