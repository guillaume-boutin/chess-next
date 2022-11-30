import { PieceMechanics } from ".";
import { Square } from "..";

class BishopMechanics extends PieceMechanics {
    get directions(): Square[] {
        return [
            new Square(1, 1),
            new Square(1, -1),
            new Square(-1, -1),
            new Square(-1, 1)
        ]
    }

    get potentialSquare(): Square[] {
        return this._allowedSquares;
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

export default BishopMechanics;