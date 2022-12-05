import { Color, Move, Square } from "..";
import { PieceType } from "../../enums/PieceType";

class Piece {
    protected _color: Color;
    protected _type: PieceType;
    protected _square: Square;
    protected _lastMove: Move;

    constructor(color: Color, type: PieceType, square: Square, lastMove?: Move) {
        this._color = color;
        this._type = type;
        this._square = square;
        this._lastMove = lastMove ?? Move.null();
    }

    get color(): Color {
        return this._color;
    }

    get type(): PieceType {
        return this._type;
    }

    get square(): Square {
        return this._square;
    }

    get lastMove(): Move {
        return this._lastMove;
    }

    get hasMoved(): boolean {
        return !this.lastMove.isNull;
    }

    get isNull(): boolean {
        return this.square.isNull
            && this.type === PieceType.NULL
            && this.color.isNull;
    }

    get isKing(): boolean {
        return this.type === PieceType.KING;
    }

    get isQueen(): boolean {
        return this.type === PieceType.QUEEN;
    }

    get isBishop(): boolean {
        return this.type === PieceType.BISHOP;
    }

    get isKnight(): boolean {
        return this.type === PieceType.KNIGHT;
    }

    get isRook(): boolean {
        return this.type === PieceType.ROOK;
    }

    get isPawn(): boolean {
        return this.type === PieceType.PAWN;
    }

    static null(): Piece {
        return new Piece(Color.null(), PieceType.NULL, Square.null());
    }

    move(square: Square): Piece {
        return new Piece(this.color, this.type, square, new Move(this.square, square));
    }

    copy(): Piece {
        return new Piece(this.color, this.type, this.square, this.lastMove);
    }
}

export default Piece;