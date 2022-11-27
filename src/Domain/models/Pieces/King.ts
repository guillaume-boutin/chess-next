import { Piece } from ".";
import { Color, Position, Square } from "..";
import { PieceType } from "../../enums/PieceType";

class King extends Piece {
    constructor(color: Color, square: Square) {
        super(color, square);
    }

    private _threatenedSquares: Square[] = [];

    get threatenedSquares(): Square[] {
        return this._threatenedSquares;
    }

    get type(): PieceType {
        return PieceType.KING;
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
        this.setThreatenedSquares(position);

        this.directions.forEach(d => {
            this.setPotentialSquaresAlongDirection(d, position);
        })
    }

    private setPotentialSquaresAlongDirection(direction: Square, position: Position) {
        let currentSquare = this.square.plus(direction);

        if (this._threatenedSquares.find(ts => ts.equals(currentSquare))) return;

        if (position.isOccupiedByColor(this.color, currentSquare)) return;

        this._potentialSquares = [ ...this._potentialSquares, currentSquare ];

        if (position.isOccupiedByColor(this.color.opposite, currentSquare)) return;

        currentSquare = currentSquare.plus(direction);
    }

    private setThreatenedSquares(position: Position): void {
        this._threatenedSquares = position.potentialMoves
            .filter(move => position.isOccupiedByColor(this.color.opposite, move.start))
            .map(move => move.end);
    }
}

export default King;