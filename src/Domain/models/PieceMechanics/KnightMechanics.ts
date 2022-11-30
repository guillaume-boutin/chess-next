import { PieceMechanics } from ".";
import { Square } from "..";

class KnightMechanics extends PieceMechanics {
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

    setAllowedSquares(): void {
        this._allowedSquares = this.directions
            .map(d => this.square.plus(d))
            .filter(s =>
                s.isInBound()
                && !this.position.isOccupiedByColor(this.color, s)
            );
    }
}

export default KnightMechanics;