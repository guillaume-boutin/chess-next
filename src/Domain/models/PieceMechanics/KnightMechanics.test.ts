import { describe, test, expect } from "@jest/globals"
import { KnightMechanics } from ".";
import { Position, Square } from "..";
import { Knight, Bishop } from "../Pieces";

describe("Knight mechanics", () => {
    test("Knight mechanics allow all of its 8 L-shaped moves", () => {
        const mechanics = new KnightMechanics(
            new Square(5, 4),
            new Position([ Knight.white(5, 4) ])
        );

        expect(mechanics.allow(new Square(6, 6))).toBe(true);
        expect(mechanics.allow(new Square(7, 5))).toBe(true);
        expect(mechanics.allow(new Square(7, 3))).toBe(true);
        expect(mechanics.allow(new Square(6, 2))).toBe(true);
        expect(mechanics.allow(new Square(4, 2))).toBe(true);
        expect(mechanics.allow(new Square(3, 3))).toBe(true);
        expect(mechanics.allow(new Square(3, 5))).toBe(true);
        expect(mechanics.allow(new Square(4, 6))).toBe(true);
    });

    test("Knight mechanics don't allow to move out of board", () => {
        const mechanics = new KnightMechanics(
            new Square(2, 7),
            new Position([ Knight.black(2, 7) ])
        );

        expect(mechanics.allow(new Square(3, 9))).toBe(false);
    });

    test("Knight mechanics don't allow to move to a square occupied by a same color piece", () => {
        const mechanics = new KnightMechanics(
            new Square(5, 4),
            new Position([ Knight.white(5, 4), Bishop.white(6, 2) ])
        );

        expect(mechanics.allow(new Square(6, 2))).toBe(false);
    });

    test("Knight mechanics allow to move to a square occupied by an opposite color piece", () => {
        const mechanics = new KnightMechanics(
            new Square(5, 4),
            new Position([ Knight.black(5, 4), Bishop.white(6, 2) ])
        );

        expect(mechanics.allow(new Square(6, 2))).toBe(true);
    });
});