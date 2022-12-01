import { PieceMechanics } from ".";
import { Color, Square } from "..";

class KingMechanics extends PieceMechanics {
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

    get startRow(): number {
        return this.color.equals(Color.white()) ? 1 : 8
    }

    get kingSideCastleSquare(): Square {
        return new Square(7, this.startRow);
    }

    get queenSideCastleSquare(): Square {
        return new Square(3, this.startRow);
    }

    setAllowedSquares(): void {
        this.directions.forEach(d => {
            this.setPotentialSquaresAlongDirection(d);
        });
        this.setCastleSquares();
    }

    private setPotentialSquaresAlongDirection(direction: Square) {
        let currentSquare = this.square.plus(direction);

        if (!currentSquare.isInBound()) return;

        if (this.position.isOccupiedByColor(this.color, currentSquare)) return;

        this._allowedSquares = [ ...this._allowedSquares, currentSquare ];
    }

    private setCastleSquares() {
        if (!this.square.equals(new Square(5, this.startRow))) return;

        const piece = this.position.getPiece(this.square);
        if (piece.hasMoved) return;

        this.setKingSideCastleSquare();
        this.setQueenSideCastleSquare();
    }

    private setKingSideCastleSquare() {
        if (this.piece.hasMoved) return;

        const inBetweenSquare = this.square.plus(new Square(1, 0));

        if (this.position.isOccupied(inBetweenSquare)) return;

        const endSquare = this.square.plus(new Square(2, 0));

        if (this.position.isOccupied(endSquare)) return;

        this._allowedSquares = [ ...this._allowedSquares, endSquare ];
    }

    private setQueenSideCastleSquare() {
        if (this.piece.hasMoved) return;

        const inBetweenSquare = this.square.plus(new Square(-1, 0));

        if (this.position.isOccupied(inBetweenSquare)) return;

        const endSquare = this.square.plus(new Square(-2, 0));

        if (this.position.isOccupied(endSquare)) return;

        this._allowedSquares = [ ...this._allowedSquares, endSquare ];
    }
}

export default KingMechanics;