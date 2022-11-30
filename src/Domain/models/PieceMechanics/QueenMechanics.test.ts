import { describe, test, expect } from "@jest/globals"
import { QueenMechanics } from ".";
import { Color, Position, Square } from "..";
import { Bishop, Knight, Queen } from "../Pieces";

describe("Queen mechanics", () => {
    test("Queen mechanics allow to move in every straight and diagonal directions", () => {
        const mechanics = new QueenMechanics(
            new Square(5, 4),
            new Position([ Queen.black(5, 4) ])
        );

        expect(mechanics.allow(new Square(5, 8))).toBe(true);
        expect(mechanics.allow(new Square(8, 7))).toBe(true);
        expect(mechanics.allow(new Square(8, 4))).toBe(true);
        expect(mechanics.allow(new Square(8, 1))).toBe(true);
        expect(mechanics.allow(new Square(5, 1))).toBe(true);
        expect(mechanics.allow(new Square(2, 1))).toBe(true);
        expect(mechanics.allow(new Square(1, 4))).toBe(true);
        expect(mechanics.allow(new Square(1, 8))).toBe(true);
    });

    test("Queen mechanics don't allow to move out of board", () => {
        const mechanics = new QueenMechanics(
            new Square(5, 4),
            new Position([ Queen.white(5, 4) ])
        );

        expect(mechanics.allow(new Square(0, 9))).toBe(false);
    });

    test("Queen mechanics don't allow to move through a same color piece", () => {
        const mechanics = new QueenMechanics(
            new Square(5, 4),
            new Position([ Queen.black(5, 4), Knight.black(7, 4), Bishop.black(3, 2) ])
        );

        expect(mechanics.allow(new Square(8, 4))).toBe(false);
        expect(mechanics.allow(new Square(2, 1))).toBe(false);
    });

    test("Queen cannot move through an opposite color piece", () => {
        const mechanics = new QueenMechanics(
            new Square(5, 4),
            new Position([ Queen.white(5, 4), Knight.black(7, 4), Bishop.black(3, 2) ])
        );

        expect(mechanics.allow(new Square(8, 4))).toBe(false);
        expect(mechanics.allow(new Square(2, 1))).toBe(false);
    });

    test("Queen mechanics allow to move to a square occupied by an opposite color piece", () => {
        const mechanics = new QueenMechanics(
            new Square(5, 4),
            new Position([ Queen.black(5, 4), Knight.white(7, 4), Bishop.white(3, 2) ])
        );

        expect(mechanics.allow(new Square(7, 4))).toBe(true);
        expect(mechanics.allow(new Square(3, 2))).toBe(true);
    });

    test("Queen mechanics don't allow to move to a square occupied by a same color piece", () => {
        const mechanics = new QueenMechanics(
            new Square(5, 4),
            new Position([ Queen.white(5, 4), Knight.white(7, 4), Bishop.white(3, 2) ])
        );

        expect(mechanics.allow(new Square(7, 4))).toBe(false);
        expect(mechanics.allow(new Square(3, 2))).toBe(false);
    });
});