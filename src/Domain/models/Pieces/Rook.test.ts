import { describe, test, expect } from "@jest/globals"
import { Position, Square } from "..";
import { Rook, Knight } from "../Pieces";

describe("Rook potential moves", () => {
    test("Rook might move Northward", () => {
        const rook = Rook.white(5,4);

        rook.setPotentialSquares(new Position([]));

        expect(rook.mightMoveTo(new Square(5, 8))).toBe(true);
    });

    test("Rook might move Eastward", () => {
        const rook = Rook.black(5, 4);

        rook.setPotentialSquares(new Position([]));

        expect(rook.mightMoveTo(new Square(8, 4))).toBe(true);
    });

    test("Rook might move Southward", () => {
        const rook = Rook.white(5, 4);

        rook.setPotentialSquares(new Position([]));

        expect(rook.mightMoveTo(new Square(5, 1))).toBe(true);
    });

    test("Rook might move Westward", () => {
        const rook = Rook.black(5, 4);

        rook.setPotentialSquares(new Position([]));

        expect(rook.mightMoveTo(new Square(1, 4))).toBe(true);
    });

    test("Rook cannot move out of board", () => {
        const rook = Rook.white(5, 4);

        rook.setPotentialSquares(new Position([]));

        expect(rook.mightMoveTo(new Square(9, 4))).toBe(false);
    });

    test("Rook cannot not move through a same color piece", () => {
        const rook = Rook.black(5, 4);
        const position = new Position([ Knight.black(5, 6) ]);
        rook.setPotentialSquares(position);

        expect(rook.mightMoveTo(new Square(5, 7))).toBe(false);
    });

    test("Rook might not move through an opposite color piece", () => {
        const rook = Rook.white(5, 4);
        const position = new Position([ Knight.black(5, 6) ]);
        rook.setPotentialSquares(position);

        expect(rook.mightMoveTo(new Square(5, 7))).toBe(false);
    });

    test("Rook might capture an opposite color piece", () => {
        const rook = Rook.black(5, 4);
        const position = new Position([ Knight.white(5, 6) ]);
        rook.setPotentialSquares(position);

        expect(rook.mightMoveTo(new Square(5, 6))).toBe(true);
    });

    test("Rook cannot capture a same color piece", () => {
        const rook = Rook.white(5, 4);
        const position = new Position([ Knight.white(5, 6) ]);
        rook.setPotentialSquares(position);

        expect(rook.mightMoveTo(new Square(5, 6))).toBe(false);
    });
});