import { Piece } from ".";
import { Color, Move, Position, Square } from "..";
import { PieceType } from "../../enums/PieceType";

class Pawn extends Piece {
    constructor(color: Color, square: Square) {
        super(color, square);
    }

    get type(): PieceType {
        return PieceType.PAWN;
    }

    static startRow(color: Color): number {
        return color.equals(Color.white()) ? 2 : 7;
    }

    static endRow(color: Color): number {
        return color.equals(Color.white()) ? 8 : 1;
    }

    static twoStepsRow(color: Color): number {
        return color.equals(Color.white()) ? 4 : 5;
    }

    static movingDirection(color: Color): number {
        return color.equals(Color.white()) ? 1 : -1;
    }

    get startRow(): number {
        return Pawn.startRow(this.color);
    }

    get endRow(): number {
        return Pawn.endRow(this.color);
    }

    get twoStepsRow(): number {
        return Pawn.twoStepsRow(this.color);
    }

    get isOnStartRow(): boolean {
        return this.square.y === this.startRow;
    }

    get movingDirection(): number {
        return this.color.equals(Color.white()) ? 1 : -1;
    }

    private _movingDisplacement(): Square {
        return new Square(0, this.movingDirection);
    }

    setPotentialSquares(position: Position): void {
        this._setMovingSquares(position);
        this._setCapturingSquares(position);
        this._setEnPassantSquares(position);
    }

    _setMovingSquares(position: Position): void {
        let currentSquare = this.square.plus(this._movingDisplacement());

        if (position.isOccupied(currentSquare)) return;

        this._potentialSquares = [ ...this._potentialSquares, currentSquare ];

        currentSquare = currentSquare.plus(this._movingDisplacement());

        if (!this.isOnStartRow) return;
        if (position.isOccupied(currentSquare)) return;

        this._potentialSquares = [ ...this._potentialSquares, currentSquare ];
    }

    private _setCapturingSquares(position: Position) {
        const squares = [-1, 1]
            .map(deltaX => this.square.plus(new Square(deltaX, this.movingDirection)))
            .filter(square =>
                square.isInBound()
                && position.isOccupiedByColor(this.color.opposite, square)
            );

        this._potentialSquares = [ ...this._potentialSquares, ...squares ];
    }

    private _setEnPassantSquares(position: Position) {
        if (this.square.y !== Pawn.twoStepsRow(this.color.opposite)) return;

        const squares = [-1, 1]
            .map(deltaX => this.square.plus(new Square(deltaX, 0)))
            .filter(oppositePawnSquare => {
                const piece = position.getPiece(oppositePawnSquare);

                if (piece === null) return false;

                if (!(piece instanceof Pawn)) return false;

                if (!piece.color.equals(this.color.opposite)) return false;

                const twoStepsMove = new Move(
                    new Square(oppositePawnSquare.x, Pawn.startRow(this.color.opposite)),
                    oppositePawnSquare
                );

                if (!position.lastMove.equals(twoStepsMove)) return false;

                return true;
            })
            .map(oppositePawnSquare => oppositePawnSquare.plus(new Square(0, this.movingDirection)));

        this._potentialSquares = [ ...this.potentialSquares, ...squares ];
    }
}

export default Pawn;