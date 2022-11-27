import { describe, test, expect } from "@jest/globals"
import { Bishop, Knight } from ".";
import { Position, Square } from "..";

describe("Bishop potential moves", () => {
    test("Bishop might move North-East", () => {
        const bishop = Bishop.black(5,4);

        bishop.setPotentialSquares(new Position([]));

        expect(bishop.mightMoveTo(new Square(8, 7))).toBe(true);
    });

    test("Bishop might move South-East", () => {
        const bishop = Bishop.white(5,4);

        bishop.setPotentialSquares(new Position([]));

        expect(bishop.mightMoveTo(new Square(8, 1))).toBe(true);
    });

    test("Bishop might move South-West", () => {
        const bishop = Bishop.black(5,4);

        bishop.setPotentialSquares(new Position([]));

        expect(bishop.mightMoveTo(new Square(2, 1))).toBe(true);
    });

    test("Bishop might move North-West", () => {
        const bishop = Bishop.white(5,4);

        bishop.setPotentialSquares(new Position([]));

        expect(bishop.mightMoveTo(new Square(1, 8))).toBe(true);
    });

    test("Bishop cannot move out of board", () => {
        const bishop = Bishop.black(5, 4);

        bishop.setPotentialSquares(new Position([]));

        expect(bishop.mightMoveTo(new Square(9, 8))).toBe(false);
    });

    test("Bishop cannot not move through a same color piece", () => {
        const bishop = Bishop.white(5, 4);
        const position = new Position([ Knight.white(2, 7) ]);
        bishop.setPotentialSquares(position);

        expect(bishop.mightMoveTo(new Square(1, 8))).toBe(false);
    });

    test("Bishop cannot move through an opposite color piece", () => {
        const bishop = Bishop.black(5, 4);
        const position = new Position([ Knight.white(3, 2) ]);
        bishop.setPotentialSquares(position);

        expect(bishop.mightMoveTo(new Square(2, 1))).toBe(false);
    });

    test("Bishop might capture an opposite color piece", () => {
        const bishop = Bishop.white(5, 4);
        const position = new Position([ Knight.black(7, 6) ]);
        bishop.setPotentialSquares(position);

        expect(bishop.mightMoveTo(new Square(7, 6))).toBe(true);
    });

    test("Bishop cannot capture a same color piece", () => {
        const bishop = Bishop.black(5, 4);
        const position = new Position([ Knight.black(2, 7) ]);
        bishop.setPotentialSquares(position);

        expect(bishop.mightMoveTo(new Square(2, 7))).toBe(false);
    });
});