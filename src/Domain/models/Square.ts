class Square {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    equals(square: Square): boolean {
        return this.x === square.x && this.y === square.y;
    }
}

export default Square;