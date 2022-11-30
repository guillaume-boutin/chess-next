import { PieceMechanics } from ".";
import { Square } from "..";

class RookMechanics extends PieceMechanics {
    get directions(): Square[] {
        return [
            new Square(0, 1),
            new Square(1, 0),
            new Square(0, -1),
            new Square(-1, 0),
        ]
    }

    setAllowedSquares(): void {
        this.directions.forEach(d => {
            this.setAllowedSquaresAlongDirection(d);
        })
    }

    private setAllowedSquaresAlongDirection(direction: Square) {
        let currentSquare = this.square.plus(direction);

        while (currentSquare.isInBound()) {
            if (this.position.isOccupiedByColor(this.color, currentSquare)) break;

            this._allowedSquares = [ ...this._allowedSquares, currentSquare ];

            if (this.position.isOccupiedByColor(this.color.opposite, currentSquare)) break;

            currentSquare = currentSquare.plus(direction);
        }
    }
}

export default RookMechanics;