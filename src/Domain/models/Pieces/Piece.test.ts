import { describe, test, expect } from "@jest/globals";
import { Move, Square } from "..";
import { Knight } from "../Pieces";

describe("Piece class", () => {
    describe("Piece.move", () => {
        test("Piece.move method changes piece's square", () => {
            const piece = Knight.black(5,5);

            piece.move(new Square(3,2));

            expect(piece.square.equals(new Square(3,2))).toBe(true);
        });

        test("method sets piece's last move", () => {
            const piece = Knight.black(5,5);

            piece.move(new Square(3,2));

            expect(piece.lastMove.equals(new Move(new Square(5, 5), new Square(3, 2)))).toBe(true);
        });
    })
});