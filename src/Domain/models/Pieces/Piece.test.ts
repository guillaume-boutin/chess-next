import { describe, test, expect } from "@jest/globals";
import { Square } from "..";
import { Knight } from ".";

describe("Piece class", () => {
    describe("Piece.setSquare", () => {
        test("method changes piece's square", () => {
            const piece = Knight.black(5,5);

            piece.setSquare(new Square(3,2));

            expect(piece.square.equals(new Square(3,2))).toBe(true);
        });
    })
});