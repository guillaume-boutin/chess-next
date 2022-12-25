import { Turn } from ".";
import { Move } from "..";

class MoveHistory {
    public turns: Move[][];

    constructor(turns: Move[][] = [[]]) {
        this.turns = turns;
    }

    get turnNumber(): number {
        return this.turns.length;
    }

    write(move: Move): MoveHistory {
        const turnNumber = this.turnNumber;
        let lastTurn = this.turns[turnNumber-1];

        if (lastTurn.length >= 2) {
            this.turns = [ ...this.turns, [ move ]];
            return this;
        }

        lastTurn = [ ...lastTurn.map(m => m.copy()), move ];
        this.turns = [ ...this.turns.slice(0, turnNumber-1), lastTurn ];
        return this;
    }
}

export default MoveHistory;