import { Color, Move, Position, Square } from "..";
import { PieceType } from "../../enums/PieceType";

class Piece {
    public color: Color;

    public square: Square;

    public lastMove: Move = Move.null();

    constructor(color: Color, square: Square) {
        this.color = color;
        this.square = square;
    }

    public get x(): number {
        return this.square.x;
    }

    public get y(): number {
        return this.square.y;
    }

    get type(): PieceType {
        return PieceType.NULL;
    }

    get hasMoved(): boolean {
        return !this.lastMove.isNull;
    }

    public get isNull(): boolean {
        return this.square.isNull() && this.type === PieceType.NULL;
    }

    public static null(): Piece {
        return new Piece(Color.white(), Square.null());
    }

    public static white<P extends Piece>(this: { new(color: Color, square: Square): P}, x: number, y: number): P {
        return new this(Color.white(), new Square(x, y));
    }

    public static black<P extends Piece>(this: { new(color: Color, square: Square): P}, x: number, y: number): P {
        return new this(Color.black(), new Square(x, y));
    }

    public move(square: Square) {
        this.lastMove = new Move(this.square, square);
        this.square = square;
    }
}

export default Piece;