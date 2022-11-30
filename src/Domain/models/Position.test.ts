import { describe, test, expect } from "@jest/globals";
import Color from "./Color";
import Move from "./Move";
import { Bishop, King, Knight, Queen, Rook } from "./Pieces";
import Position from "./Position";
import Square from "./Square";

describe("Position class", () => {
    describe("position.getPiece method", () => {
        test("method returns a piece", () => {
            const position = new Position([
                King.white(3, 6)
            ]);

            const piece = position.getPiece( new Square(3, 6));

            expect(piece).toBeInstanceOf(King);
        });

        test("method returns a null piece if there is not piece", () => {
            const position = new Position([]);

            const piece = position.getPiece(new Square(3, 6));

            expect(piece.isNull).toBe(true);
        });
    });
})