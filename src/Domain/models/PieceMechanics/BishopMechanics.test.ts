import { describe, test, expect } from "@jest/globals"
import { BishopMechanics } from ".";
import { Color, Position, Square } from "..";
import { Bishop, Knight } from "../Pieces";

describe("Bishop mechanics", () => {
    test("Bishop mechanics allow to move North-East", () => {
        const mechanics = new BishopMechanics(
            new Square(5, 4),
            new Position([ Bishop.white(5, 4) ])
        );

        expect(mechanics.allow(new Square(8, 7))).toBe(true);
    });

    test("Bishop mechanics allow to move South-East", () => {
        const mechanics = new BishopMechanics(
            new Square(5, 4),
            new Position([ Bishop.black(5, 4) ])
        );

        expect(mechanics.allow(new Square(8, 1))).toBe(true);
    });

    test("Bishop mechanics allow to move South-West", () => {
        const mechanics = new BishopMechanics(
            new Square(5, 4),
            new Position([ Bishop.white(5, 4) ])
        );

        expect(mechanics.allow(new Square(2, 1))).toBe(true);
    });

    test("Bishop mechanics allow to move North-West", () => {
        const mechanics = new BishopMechanics(
            new Square(5, 4),
            new Position([ Bishop.black(5, 4) ])
        );

        expect(mechanics.allow(new Square(1, 8))).toBe(true);
    });

    test("Bishop mechanics don't allow to move out of board", () => {
        const mechanics = new BishopMechanics(
            new Square(5, 4),
            new Position([ Bishop.white(5, 4) ])
        );

        expect(mechanics.allow(new Square(9, 8))).toBe(false);
    });

    test("Bishop mechanics don't allow to move through a same color piece", () => {
        const mechanics = new BishopMechanics(
            new Square(5, 4),
            new Position([ Bishop.black(5, 4), Knight.black(2, 7) ])
        );

        expect(mechanics.allow(new Square(1, 8))).toBe(false);
    });

    test("Bishop mechanics don't allow to move through an opposite color piece", () => {
        const mechanics = new BishopMechanics(
            new Square(5, 4),
            new Position([ Bishop.white(5, 4), Knight.black(3, 2) ])
        );

        expect(mechanics.allow(new Square(2, 1))).toBe(false);
    });

    test("Bishop mechanics allow to move to a square occupied by a piece of opposite color", () => {
        const mechanics = new BishopMechanics(
            new Square(5, 4),
            new Position([ Bishop.white(5, 4), Knight.black(7, 6) ])
        );

        expect(mechanics.allow(new Square(7, 6))).toBe(true);
    });

    test("Bishop mechanics doesn't allow to move to a square occupied by a piece of same color", () => {
        const mechanics = new BishopMechanics(
            new Square(5, 4),
            new Position([ Bishop.black(5, 4), Knight.black(2, 7) ])
        );

        expect(mechanics.allow(new Square(2, 7))).toBe(false);
    });
});