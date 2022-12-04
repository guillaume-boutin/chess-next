import { describe, test, expect } from "@jest/globals"
import { PawnMechanics } from ".";
import { Move, Position, Square } from "..";
import { Bishop, Knight, Pawn } from "../Pieces";

describe("Pawn mechanics", () => {
    describe("Pawn move mechanics", () => {
        test("Pawn mechanics allow to move one square ahead", () => {
            const mechanics = new PawnMechanics(
                new Square(4, 3),
                new Position([ Pawn.white(4, 3) ])
            );

            expect(mechanics.allow(new Square(4, 4))).toBe(true);
        });

        test("Pawn mechanics don't allow to move more than one square ahead", () => {
            const mechanics = new PawnMechanics(
                new Square(6, 5),
                new Position([ Pawn.black(6, 5) ])
            );

            expect(mechanics.allow(new Square(6, 7))).toBe(false);
        });

        test("Pawn mechanics allow to move 2 squares ahead if it's on its starting row", () => {
            const mechanics = new PawnMechanics(
                new Square(3, 2),
                new Position([ Pawn.white(3, 2) ])
            );

            expect(mechanics.allow(new Square(3, 4))).toBe(true);
        });

        test("Pawn mechanics don't allow to move on a square occupied a same color piece", () => {
            const mechanics = new PawnMechanics(
                new Square(5, 7),
                new Position([ Pawn.black(5, 7), Bishop.black(5, 6) ])
            );

            expect(mechanics.allow(new Square(5, 6))).toBe(false);
        });

        test("Pawn mechanics don't allow to move to a square occupied by an opposite color piece", () => {
            const mechanics = new PawnMechanics(
                new Square(4, 5),
                new Position([ Pawn.white(4, 5), Knight.white(4, 6) ])
            );

            expect(mechanics.allow(new Square(4, 6))).toBe(false);
        });

        test("Pawn mechanics don't allow to move backwards", () => {
            const mechanics = new PawnMechanics(
                new Square(2, 5),
                new Position([ Pawn.black(2, 5) ])
            );

            expect(mechanics.allow(new Square(2, 6))).toBe(false);
        });

        test("Pawn mechanics don't allow to move sideways", () => {
            const mechanics = new PawnMechanics(
                new Square(5, 4),
                new Position([ Pawn.white(5, 4) ])
            );

            expect(mechanics.allow(new Square(6, 4))).toBe(false);
        });
    });

    describe("Pawn capture mechanics", () => {
        test("Pawn mechanics allow to capture on immediate foreward diagonal", () => {
            const mechanics = new PawnMechanics(
                new Square(3, 4),
                new Position([ Pawn.black(3, 4), Bishop.white(2, 3) ])
            );

            expect(mechanics.allow(new Square(2, 3))).toBe(true);
        });

        test("Pawn mechanics don't allow to capture farther than immediate diagonal square", () => {
            const mechanics = new PawnMechanics(
                new Square(6, 4),
                new Position([ Pawn.white(6, 4), Knight.black(4, 6) ])
            );

            expect(mechanics.allow(new Square(4, 6))).toBe(false);
        });

        test("Pawn mechanics don't allow to cannot capture on an empty square", () => {
            const mechanics = new PawnMechanics(
                new Square(3, 5),
                new Position([ Pawn.black(3, 5) ])
            );

            expect(mechanics.allow(new Square(4, 4))).toBe(false);
        });

        test("Pawn mechanics don't allow to capture a same color piece", () => {
            const mechanics = new PawnMechanics(
                new Square(4, 3),
                new Position([ Pawn.white(4, 3), Bishop.white(5, 4) ])
            );

            expect(mechanics.allow(new Square(5, 4))).toBe(false);
        });
    });

    describe("Pawn en-passant mechanics", () => {
        test("Pawn mechanics allow to capture en-passant", () => {
            let position = new Position(
                [ Pawn.black(3, 4), Pawn.white(4, 4) ],
                new Move(new Square(4, 2), new Square(4, 4))
            );

            const mechanics = new PawnMechanics(new Square(3, 4), position);

            expect(mechanics.allow(new Square(4, 3))).toBe(true);
        });

        test("Pawn mechanics doesn't allow to capture en-passant if opponent's pawn move wasn't move wasn't its latest one", () => {
            const position = new Position(
                [ Pawn.white(6, 5), Pawn.black(5, 5) ],
                new Move(new Square(8, 8), new Square(8, 1))
            );

            const mechanics = new PawnMechanics(new Square(6, 5), position);

            expect(mechanics.allow(new Square(5, 6))).toBe(false);
        });

        test("Pawn cannot capture en-passant if opponent's pawn move wasn't a two steps move", () => {
            const position = new Position(
                [ Pawn.black(2, 4), Pawn.white(3, 4) ],
                new Move(new Square(3, 3), new Square(3, 4))
            );

            const mechanics = new PawnMechanics(new Square(2, 4), position);

            expect(mechanics.allow(new Square(3, 3))).toBe(false);
        });
    });
});