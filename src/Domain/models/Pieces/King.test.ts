import { describe, test, expect } from "@jest/globals"
import { Position, Square } from "..";
import { King, Rook } from "../Pieces";

describe("King potential moves", () => {
    test("King might move one square in every direction", () => {
        const king = King.white(3, 4);

        king.setPotentialSquares(new Position([]));

        expect(king.mightMoveTo(new Square(3, 5))).toBe(true);
        expect(king.mightMoveTo(new Square(4, 5))).toBe(true);
        expect(king.mightMoveTo(new Square(4, 4))).toBe(true);
        expect(king.mightMoveTo(new Square(4, 3))).toBe(true);
        expect(king.mightMoveTo(new Square(3, 3))).toBe(true);
        expect(king.mightMoveTo(new Square(2, 3))).toBe(true);
        expect(king.mightMoveTo(new Square(2, 4))).toBe(true);
        expect(king.mightMoveTo(new Square(2, 5))).toBe(true);
    });

    test("King cannot move more than one square in a direction", () => {
        const king = King.black(3, 4);

        king.setPotentialSquares(new Position([]));

        expect(king.mightMoveTo(new Square(3, 6))).toBe(false);
    });

    test("King cannot move to a square controlled by an opponent's piece", () => {
        const king = King.white(6, 2);

        const position = new Position([
            Rook.black(5, 6)
        ]);

        king.setPotentialSquares(position);

        expect(king.mightMoveTo(new Square(5, 3))).toBe(false);
        expect(king.mightMoveTo(new Square(5, 2))).toBe(false);
        expect(king.mightMoveTo(new Square(5, 1))).toBe(false);
    });
});