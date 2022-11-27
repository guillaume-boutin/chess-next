abstract class Piece {
    public color: string;

    public type: string;

    public square: { x: number, y: number };

    public get x(): number {
        return this.square.x;
    }

    public get y(): number {
        return this.square.y;
    }

    constructor(color: string, type: string, square: { x: number, y: number }) {
        this.color = color;
        this.type = type;
        this.square = square;
    }

    public static white<P extends Piece>(this: { new(color: string, square: { x: number, y: number }): P}, x: number, y: number): P {
        return new this("white", { x, y });
    }

    public static black<P extends Piece>(this: { new(color: string, square: { x: number, y: number }): P}, x: number, y: number): P {
        return new this("black", { x, y });
    }
}

export default Piece;