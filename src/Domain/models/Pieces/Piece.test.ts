import { describe, test, expect } from "@jest/globals";
import { Move, Square } from "..";
import { Bishop, Knight, Pawn, Queen, Rook } from "../Pieces";

describe("Piece class", () => {
    describe("Piece.copy", () => {
        test("Piece.copy creates a new instance of a piece", () => {
            const piece = Rook.white(4,2);
            const newPiece = piece.copy();

            expect(piece === piece).toBe(true);
            expect(piece === newPiece).toBe(false);
        });

        test("Piece.copy copies all the public values of the piece", () => {
            const piece = Queen.black(8,6);
            const newPiece = piece.copy();

            expect(newPiece.color.equals(piece.color)).toBe(true);
            expect(newPiece.type === piece.type).toBe(true);
            expect(newPiece.square.equals(piece.square)).toBe(true);
            expect(newPiece.lastMove.equals(piece.lastMove)).toBe(true);
        });
    });

    describe("Piece.move", () => {
        test("Piece.move method creates a new piece on the destination square", () => {
            const piece = Knight.black(5,5);

            const movedPiece = piece.move(new Square(3,2));

            expect(piece.square.equals(new Square(5, 5))).toBe(true);
            expect(movedPiece.square.equals(new Square(3, 2))).toBe(true);
        });

        test("Piece.move sets the last move on the moved piece", () => {
            const piece = Bishop.white(2, 6);
            const movedPiece = piece.move(new Square(3, 5));

            expect(movedPiece.lastMove.equals(new Move(new Square(2, 6), new Square(3, 5)))).toBe(true);
        });
    })
});