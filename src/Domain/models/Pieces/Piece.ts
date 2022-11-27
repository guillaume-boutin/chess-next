class Piece {
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
}

export default Piece;