export enum PieceType {
    KING = "king",
    QUEEN = "queen",
    BISHOP = "bishop",
    KNIGHT = "knight",
    ROOK = "rook",
    PAWN = "pawn",
    NULL = "",
}

export type PromotionType =
    PieceType.QUEEN
    | PieceType.ROOK
    | PieceType.BISHOP
    | PieceType.KNIGHT
    | PieceType.NULL;