import { equal } from "assert";
import { Piece } from "./Pieces";
import Square from "./Square";

class Position {
    public pieces: Piece[];

    constructor (pieces: Piece[]) {
        this.pieces = pieces;
    }

    public at(x: number, y: number): Piece | null {
        return this.pieces.find(p => p.x === x && p.y === y) || null;
    }

    public removeAt(x: number, y: number): void {
        var index = this.pieces.findIndex(p => p.x === x && p.y === y);

        if (index === -1) return;

        let pieces = [ ...this.pieces ];
        pieces = [ ...pieces.slice(0, index), ...pieces.slice(index+1) ];
        this.pieces = pieces;
    }

    public move(start: Square, end: Square): void {
        if (!this.at(start.x, start.y)) return;

        this.removeAt(end.x, end.y);

        const index = this.pieces.findIndex(p => p.square.equals(start));

        this.pieces[index].setSquare(new Square(end.x, end.y));
    }
}

export default Position;