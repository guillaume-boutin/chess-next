import { Piece } from ".";
import { Color, Position, Square } from "..";
import { PieceType } from "../../enums/PieceType";

class Queen extends Piece {
    constructor(color: Color, square: Square) {
        super(color, square);
    }

    get type(): PieceType {
        return PieceType.QUEEN;
    }

    get directions(): Square[] {
        return [
            new Square(0, 1),
            new Square(1, 0),
            new Square(0, -1),
            new Square(-1, 0),
            new Square(1, 1),
            new Square(1, -1),
            new Square(-1, -1),
            new Square(-1, 1)
        ]
    }

    setPotentialSquares(position: Position): void {
        this.directions.forEach(d => {
            this.setPotentialSquaresAlongDirection(d, position);
        })
    }

    private setPotentialSquaresAlongDirection(direction: Square, position: Position) {
        let currentSquare = this.square.plus(direction);

        while (currentSquare.isInBound()) {
            if (position.isOccupiedByColor(this.color, currentSquare)) break;

            this._potentialSquares = [ ...this._potentialSquares, currentSquare ];

            if (position.isOccupiedByColor(this.color.opposite, currentSquare)) break;

            currentSquare = currentSquare.plus(direction);
        }
    }
}

export default Queen;