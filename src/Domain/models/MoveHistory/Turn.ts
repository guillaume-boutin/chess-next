import Move from "../Move";

class Turn {
    public moves: Move[] = [];

    write(move: Move) {

        this.moves = [ ...this.moves, move ];
    }
}

export default Turn;