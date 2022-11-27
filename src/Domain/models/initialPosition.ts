import { Bishop, King, Knight, Pawn, Piece, Queen, Rook } from "./Pieces";

export const initialPosition = (): Piece[] => {
    let pieces: Piece[] = [];

    for (let x = 1; x < 9; x++) {
        pieces = [ ...pieces, Pawn.white(x, 2), Pawn.black(x, 7)];
    }

    return [
        ... pieces,
        Rook.white(1, 1), Rook.white(8, 1),
        Rook.black(1, 8), Rook.black(8, 8),

        Knight.white(2, 1), Knight.white(7, 1),
        Knight.black(2, 8), Knight.black(7, 8),

        Bishop.white(3, 1), Bishop.white(6, 1),
        Bishop.black(3, 8), Bishop.black(6, 8),

        Queen.white(4, 1), King.white(5, 1),
        Queen.black(4, 8), King.black(5, 8),
    ];
}