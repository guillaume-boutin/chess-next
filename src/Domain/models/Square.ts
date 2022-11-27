class Square {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static null(): Square {
        return new Square(0, 0);
    }

    isNull(): boolean {
        return this.equals(Square.null());
    }

    equals(square: Square): boolean {
        return this.x === square.x && this.y === square.y;
    }

    plus(square: Square): Square {
        return new Square(this.x + square.x, this.y + square.y);
    }

    minus(square: Square): Square {
        return new Square(this.x - square.x, this.y - square.y);
    }

    isInBound(): boolean {
        return this.x >= 0 && this.x <= 8
            && this.y >=0 && this.y <= 8;
    }
}

export default Square;