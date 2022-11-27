import { Color, Move, Position, Square } from "..";
import { PieceType } from "../../enums/PieceType";

abstract class Piece {
    public color: Color;

    public square: Square;

    public lastMove: Move = Move.null();

    public get x(): number {
        return this.square.x;
    }

    public get y(): number {
        return this.square.y;
    }

    public get potentialSquares(): Square[] {
        return this._potentialSquares;
    }

    abstract setPotentialSquares(position: Position): void;

    abstract get type(): PieceType;

    protected _potentialSquares: Square[] = [];

    constructor(color: Color, square: Square) {
        this.color = color;
        this.square = square;
    }

    public static white<P extends Piece>(this: { new(color: Color, square: Square): P}, x: number, y: number): P {
        return new this(Color.white(), new Square(x, y));
    }

    public static black<P extends Piece>(this: { new(color: Color, square: Square): P}, x: number, y: number): P {
        return new this(Color.black(), new Square(x, y));
    }

    public setSquare(square: Square) {
        this.square = square;
    }

    public mightMoveTo(square: Square): boolean {
        return this._potentialSquares.findIndex(cs => cs.equals(square)) > -1;
    }
}

export default Piece;