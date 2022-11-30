import { Color, Position, Square } from "..";
import { Piece } from "../Pieces";

abstract class PieceMechanics {
    public color: Color;
    public square: Square;
    public position: Position;
    public piece: Piece;

    protected _allowedSquares: Square[] = [];

    constructor(square: Square, position: Position) {
        this.position = position;
        this.piece = position.getPiece(square);
        this.color = this.piece.color;
        this.square = this.piece.square;

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