import { describe, test, expect } from "@jest/globals"
import { Color, Move, Position, Square } from "..";
import { Bishop, King, Knight, Queen, Rook } from "../Pieces";
import KingMechanics from "./KingMechanics";

describe("King mechanics", () => {
    test("King mechanics allow to move one square in every 8 directions", () => {
        const mechanics = new KingMechanics(
            new Square(3, 4),
            new Position([ King.white(3, 4) ])
        );

        expect(mechanics.allow(new Square(3, 5))).toBe(true);
        expect(mechanics.allow(new Square(4, 5))).toBe(true);
        expect(mechanics.allow(new Square(4, 4))).toBe(true);
        expect(mechanics.allow(new Square(4, 3))).toBe(true);
        expect(mechanics.allow(new Square(3, 3))).toBe(true);
        expect(mechanics.allow(new Square(2, 3))).toBe(true);
        expect(mechanics.allow(new Square(2, 4))).toBe(true);
        expect(mechanics.allow(new Square(2, 5))).toBe(true);
    });

    test("King mechanics don't allow to move more than one square in any direction", () => {
        const mechanics = new KingMechanics(
            new Square(3, 4),
            new Position([ King.black(3, 4) ])
        );

        expect(mechanics.allow(new Square(3, 6))).toBe(false);
    });

    test("King mechanics allow to move to a square occupied by an opposite color piece", () => {
        const mechanics = new KingMechanics(
            new Square(3, 4),
            new Position([ King.white(3, 4), Bishop.black(3, 5) ])
        );

        expect(mechanics.allow(new Square(3, 5))).toBe(true);
    });

    test("King mechanics don't allow to move to a square occupied by a same color piece", () => {
        const mechanics = new KingMechanics(
            new Square(3, 4),
            new Position([ King.black(3, 4), Bishop.black(3, 5) ])
        );

        expect(mechanics.allow(new Square(3, 5))).toBe(false);
    });

    test("King mechanics allow castle", () => {
        const mechanics = new KingMechanics(
            new Square(5, 1),
            new Position([ King.white(5, 1) ])
        );

        expect(mechanics.allow(new Square(3, 1))).toBe(true);
        expect(mechanics.allow(new Square(7, 1))).toBe(true);
    });

    test("King mechanics don't allow castle if there is a piece of same color in the way", () => {
        const mechanics = new KingMechanics(
            new Square(5, 8),
            new Position([ King.white(5, 8), Bishop.black(6, 8), Queen.black(3, 8) ])
        );

        expect(mechanics.allow(new Square(3, 8))).toBe(false);
        expect(mechanics.allow(new Square(7, 8))).toBe(false);
    });

    test("King mechanics don't allow castle if there is a piece of opposite color in the way", () => {
        const mechanics = new KingMechanics(
            new Square(5, 1),
            new Position([ King.white(5, 1), Bishop.black(7, 1), Knight.black(4, 1) ])
        );

        expect(mechanics.allow(new Square(3, 1))).toBe(false);
        expect(mechanics.allow(new Square(7, 1))).toBe(false);
    });

    test("King mechanics don't allow castle if King has already moved", () => {
        const king = King.black(5, 7).move(new Square(7, 8));

        const mechanics = new KingMechanics(
            new Square(5, 8),
            new Position([ king ])
        );

        expect(mechanics.allow(new Square(3, 8))).toBe(false);
        expect(mechanics.allow(new Square(7, 8))).toBe(false);
    });
});