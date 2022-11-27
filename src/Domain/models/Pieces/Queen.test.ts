import { describe, test, expect } from "@jest/globals"
import { Position, Square } from "..";
import { Queen, Bishop, Knight } from "../Pieces";

describe("Queen potential moves", () => {
    test("Queen might move in every straight direction", () => {
        const queen = Queen.black(5, 4);

        queen.setPotentialSquares(new Position([]));

        expect(queen.mightMoveTo(new Square(5, 8))).toBe(true);
        expect(queen.mightMoveTo(new Square(8, 7))).toBe(true);
        expect(queen.mightMoveTo(new Square(8, 4))).toBe(true);
        expect(queen.mightMoveTo(new Square(8, 1))).toBe(true);
        expect(queen.mightMoveTo(new Square(5, 1))).toBe(true);
        expect(queen.mightMoveTo(new Square(2, 1))).toBe(true);
        expect(queen.mightMoveTo(new Square(1, 4))).toBe(true);
        expect(queen.mightMoveTo(new Square(1, 8))).toBe(true);
    });

    test("Queen cannot move out of board", () => {
        const queen = Queen.black(5, 4);

        queen.setPotentialSquares(new Position([]));

        expect(queen.mightMoveTo(new Square(0, 9))).toBe(false);
    });

    test("Queen cannot not move through a same color piece", () => {
        const queen = Queen.white(5, 4);
        const position = new Position([
            Knight.white(7, 4),
            Bishop.white(3, 2)
        ]);
        queen.setPotentialSquares(position);

        expect(queen.mightMoveTo(new Square(8, 4))).toBe(false);
        expect(queen.mightMoveTo(new Square(2, 1))).toBe(false);
    });

    test("Queen cannot move through an opposite color piece", () => {
        const queen = Queen.black(5, 4);
        const position = new Position([
            Knight.white(3, 6),
            Bishop.white(5, 2)
        ]);
        queen.setPotentialSquares(position);

        expect(queen.mightMoveTo(new Square(1, 8))).toBe(false);
        expect(queen.mightMoveTo(new Square(5, 1))).toBe(false);
    });

    test("Queen might capture an opposite color piece", () => {
        const queen = Queen.white(5, 4);
        const position = new Position([ Knight.black(3, 4) ]);
        queen.setPotentialSquares(position);

        expect(queen.mightMoveTo(new Square(3, 4))).toBe(true);
    });

    test("Queen cannot capture a same color piece", () => {
        const queen = Queen.black(5, 4);
        const position = new Position([ Knight.black(8, 1) ]);
        queen.setPotentialSquares(position);

        expect(queen.mightMoveTo(new Square(8, 1))).toBe(false);
    });
});