import { Pawn } from "../Pieces";
import { Color, Move, Square } from "..";
import { PieceMechanics } from ".";

class PawnMechanics extends PieceMechanics {
    static startRow(color: Color): number {
        return color.equals(Color.white()) ? 2 : 7;
    }

    get startRow(): number {
        return PawnMechanics.startRow(this.color);
    }

    get endRow(): number {
        return this.color.equals(Color.white()) ? 8 : 1;
    }

    static twoStepsRow(color: Color): number {
        return color.equals(Color.white()) ? 4 : 5;
    }

    get twoStepsRow(): number {
        return PawnMechanics.twoStepsRow(this.color);
    }

    get isOnStartRow(): boolean {
        return this.square.y === this.startRow;
    }

    get movingDirection(): number {
        return this.color.equals(Color.white()) ? 1 : -1;
    }

    get movingSquare(): Square {
        return this.square.plus(new Square(0, this.movingDirection));
    }

    get capturingSquares(): Square[] {
        return [
            this.square.plus(new Square(-1, this.movingDirection)),
            this.square.plus(new Square(1, this.movingDirection)),
        ];
    }

    setAllowedSquares(): void {
        this._setAllowedMovingSquares();
        this._setAllowedCapturingSquares();
        this._setEnPassantSquares();
    }

    _setAllowedMovingSquares(): void {
        const step = new Square(0, this.movingDirection);

        let currentSquare = this.square.plus(step);

        if (this.position.isOccupied(currentSquare)) return;

        this._allowedSquares = [ ...this._allowedSquares, currentSquare ];

        if (!this.isOnStartRow) return;

        currentSquare = currentSquare.plus(step);

        if (this.position.isOccupied(currentSquare)) return;

        this._allowedSquares = [ ...this._allowedSquares, currentSquare ];
    }

    private _setAllowedCapturingSquares() {
        const squares = this.capturingSquares
            .filter(square =>
                square.isInBound()
                && this.position.isOccupiedByColor(this.color.opposite, square)
        );

        this._allowedSquares = [ ...this._allowedSquares, ...squares ];
    }

    private _setEnPassantSquares() {
        if (this.square.y !== PawnMechanics.twoStepsRow(this.color.opposite)) return;

        const squares = this.capturingSquares
            .filter(capturingSquare => {
                const opponentPawnSquare = capturingSquare.minus(new Square(0, this.movingDirection));

                const piece = this.position.getPiece(opponentPawnSquare);

                if (!(piece.isPawn)) return false;
                if (!piece.color.equals(this.color.opposite)) return false;

                const twoStepsMove = new Move(
                    new Square(opponentPawnSquare.x, PawnMechanics.startRow(this.color.opposite)),
                    opponentPawnSquare
                )

                if (!this.position.lastMove.equals(twoStepsMove)) return false;

                return true;
            });

        this._allowedSquares = [ ...this._allowedSquares, ...squares ];
    }
}

export default PawnMechanics;