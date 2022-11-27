import { Piece } from ".";
import { Color, Position, Square } from "..";
import { PieceType } from "../../enums/PieceType";

class Knight extends Piece {
    constructor(color: Color, square: Square) {
        super(color, square);
    }

    get type(): PieceType {
        return PieceType.KNIGHT;
    }

    get directions(): Square[] {
        return [
            new Square(1, 2),
            new Square(2, 1),
            new Square(2, -1),
            new Square(1, -2),
            new Square(-1, -2),
            new Square(-2, -1),
            new Square(-2, 1),
            new Square(-1, 2),
        ]
    }

    setPotentialSquares(position: Position): void {
        this._potentialSquares = this.directions
            .map(d => this.square.plus(d))
            .filter(s =>
                s.isInBound()
                && !position.isOccupiedByColor(this.color, s)
            );
    }
}

export default Knight;