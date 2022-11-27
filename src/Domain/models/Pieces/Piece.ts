import { Square } from "..";

abstract class Piece {
    public color: string;

    public type: string;

    public square: Square;

    public get x(): number {
        return this.square.x;
    }

    public get y(): number {
        return this.square.y;
    }

    constructor(color: string, type: string, square: Square) {
        this.color = color;
        this.type = type;
        this.square = square;
    }

    public static white<P extends Piece>(this: { new(color: string, square: Square): P}, x: number, y: number): P {
        return new this("white", new Square(x, y));
    }

    public static black<P extends Piece>(this: { new(color: string, square: Square): P}, x: number, y: number): P {
        return new this("black", new Square(x, y));
    }

    public setSquare(square: Square) {
        this.square = square;
    }
}

export default Piece;