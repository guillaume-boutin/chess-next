import Square from "./Square";

class Move {
    public start: Square;
    public end: Square;

    constructor(start: Square, end: Square) {
        this.start = start;
        this.end = end;
    }

    static null(): Move {
        return new Move(Square.null(), Square.null());
    }

    isNull(): boolean {
        return this.equals(Move.null());
    }

    equals(move: Move): boolean {
        return this.start.equals(move.start) && this.end.equals(move.end);
    }
}

export default Move;