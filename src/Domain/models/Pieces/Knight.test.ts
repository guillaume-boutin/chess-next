import { describe, test, expect } from "@jest/globals"
import { Position, Square } from "..";
import { Knight, Bishop } from "../Pieces";

describe("Knight's potential moves", () => {
    test("Knight might make to any of its 8 L-shaped moves", () => {
        const knight = Knight.white(5, 4);
        const position = new Position([]);
        knight.setPotentialSquares(position);

        expect(knight.mightMoveTo(new Square(6, 6))).toBe(true);
        expect(knight.mightMoveTo(new Square(7, 5))).toBe(true);
        expect(knight.mightMoveTo(new Square(7, 3))).toBe(true);
        expect(knight.mightMoveTo(new Square(6, 2))).toBe(true);
        expect(knight.mightMoveTo(new Square(4, 2))).toBe(true);
        expect(knight.mightMoveTo(new Square(3, 3))).toBe(true);
        expect(knight.mightMoveTo(new Square(3, 5))).toBe(true);
        expect(knight.mightMoveTo(new Square(4, 6))).toBe(true);
    });

    test("Knight cannot move out of board", () => {
        const knight = Knight.black(2, 7);

        knight.setPotentialSquares(new Position([]));

        expect(knight.mightMoveTo(new Square(3, 9))).toBe(false);
    });

    test("Knight cannot capture a same color piece", () => {
        const knight = Knight.white(5, 4);
        const position = new Position([
            Bishop.white(6, 2)
        ]);
        knight.setPotentialSquares(position);

        expect(knight.mightMoveTo(new Square(6, 2))).toBe(false);
    });

    test("Knight might capture an opponent's piece", () => {
        const knight = Knight.black(5, 4);
        const position = new Position([
            Bishop.white(3, 5)
        ]);
        knight.setPotentialSquares(position);

        expect(knight.mightMoveTo(new Square(3, 5))).toBe(true);
    });
});