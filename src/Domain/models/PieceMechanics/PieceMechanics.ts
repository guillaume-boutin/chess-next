import { BishopMechanics, KingMechanics, KnightMechanics, PawnMechanics, QueenMechanics, RookMechanics } from ".";
import { Color, Position, Square } from "..";
import { PieceType } from "../../enums/PieceType";
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

    public static make(square: Square, position: Position): PieceMechanics {
        const piece = position.getPiece(square);

        switch (piece.type) {
            case PieceType.KING: return new KingMechanics(square, position);
            case PieceType.QUEEN: return new QueenMechanics(square, position);
            case PieceType.BISHOP: return new BishopMechanics(square, position);
            case PieceType.KNIGHT: return new KnightMechanics(square, position);
            case PieceType.ROOK: return new RookMechanics(square, position);
            case PieceType.PAWN: return new PawnMechanics(square, position);

            default: throw `No mechanics for piece type ${piece.type} at square (${square.x}, ${square.y})`;
        }
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