import { Color, Position, Square } from "..";
import { Piece } from "../Pieces";

abstract class PieceMechanics {
    public color: Color;
    public square: Square;
    public position: Position;
    public piece: Piece;

    protected _allowedSquares: Square[] = [];

    constructor(color: Color, square: Square, position: Position) {
        this.color = color;
        this.square = square;
        this.position = position;
        this.piece = this.position.getPiece(square);

        this.setAllowedSquares();
    }

    get potentialSquare(): Square[] {
        return this._allowedSquares;
    }

    abstract setAllowedSquares(): void;

    allow(square: Square): boolean {
        return this.potentialSquare.find(ps => ps.equals(square)) !== undefined;
    }
}

export default PieceMechanics;