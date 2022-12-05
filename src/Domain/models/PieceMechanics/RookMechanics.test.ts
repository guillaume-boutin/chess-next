import { describe, test, expect } from "@jest/globals"
import { RookMechanics } from ".";
import { Position, Square } from "..";
import { Rook, Knight } from "../Pieces";

describe("Rook mechanics", () => {
    test("Rook mechanics allow to move North", () => {
        const mechanics = new RookMechanics(
            new Square(5, 4),
            new Position([ Rook.white(5, 4) ])
        );

        expect(mechanics.allow(new Square(5, 8))).toBe(true);
    });

    test("Rook mechanics allow to move East", () => {
        const mechanics = new RookMechanics(
            new Square(5, 4),
            new Position([ Rook.black(5, 4)])
        );

        expect(mechanics.allow(new Square(8, 4))).toBe(true);
    });

    test("Rook mechanics allow to move South", () => {
        const mechanics = new RookMechanics(
            new Square(5, 4),
            new Position([ Rook.white(5, 4) ])
        );

        expect(mechanics.allow(new Square(5, 1))).toBe(true);
    });

    test("Rook mechanics allow to move West", () => {
        const mechanics = new RookMechanics(
            new Square(5, 4),
            new Position([ Rook.black(5, 4) ])
        );

        expect(mechanics.allow(new Square(1, 4))).toBe(true);
    });

    test("Rook mechanics don't allow to move out of board", () => {
        const mechanics = new RookMechanics(
            new Square(5, 4),
            new Position([ Rook.white(5, 4) ])
        );

        expect(mechanics.allow(new Square(5, 9))).toBe(false);
        expect(mechanics.allow(new Square(9, 4))).toBe(false);
        expect(mechanics.allow(new Square(5, 0))).toBe(false);
        expect(mechanics.allow(new Square(0, 4))).toBe(false);
    });

    test("Rook mechanics don't allow to move through a same color piece", () => {
        const mechanics = new RookMechanics(
            new Square(5, 4),
            new Position([ Rook.black(5, 4), Knight.black(5, 6) ])
        );

        expect(mechanics.allow(new Square(5, 7))).toBe(false);
    });

    test("Rook mechanics don't allow to move through an opposite color piece", () => {
        const mechanics = new RookMechanics(
            new Square(5, 4),
            new Position([ Rook.white(5, 4), Knight.black(5, 6) ])
        );

        expect(mechanics.allow(new Square(5, 7))).toBe(false);
    });

    test("Rook mechanics allow to move to a square occupied by an opposite color piece", () => {
        const mechanics = new RookMechanics(
            new Square(5, 4),
            new Position([ Rook.black(5, 4), Knight.white(5, 6) ])
        );

        expect(mechanics.allow(new Square(5, 6))).toBe(true);
    });

    test("Rook mechanics doesn't allow to move to a square occupied by a same color piece", () => {
        const mechanics = new RookMechanics(
            new Square(5, 4),
            new Position([ Rook.white(5, 4), Knight.white(5, 6) ])
        );

        expect(mechanics.allow(new Square(5, 6))).toBe(false);
    });
});