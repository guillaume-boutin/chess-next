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

    get isNull(): boolean {
        return this.equals(Square.null());
    }

    copy(): Square {
        return new Square(this.x, this.y);
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

    plusX(x: number): Square {
        return new Square(this.x + x, this.y);
    }

    plusY(y: number): Square {
        return new Square(this.x, this.y + y);
    }

    isInBound(): boolean {
        return this.x >= 1 && this.x <= 8
            && this.y >= 1 && this.y <= 8;
    }
}

export default Square;