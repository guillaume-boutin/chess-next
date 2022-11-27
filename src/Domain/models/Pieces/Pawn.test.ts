import { describe, test, expect } from "@jest/globals"
import { Move, Position, Square } from "..";
import { Bishop, Knight, Pawn } from "../Pieces";

describe("Pawn's potential moves", () => {
    test("Pawn might move one square ahead", () => {
        const whitePawn = Pawn.white(5, 4);
        const blackPawn = Pawn.black(4, 5);
        const position = new Position([ whitePawn, blackPawn ]);

        whitePawn.setPotentialSquares(position);
        blackPawn.setPotentialSquares(position);

        expect(whitePawn.mightMoveTo(new Square(5, 5))).toBe(true);
        expect(blackPawn.mightMoveTo(new Square(4, 4))).toBe(true);
    });

    test("Pawn cannot move more than one square ahead", () => {
        const whitePawn = Pawn.white(5, 4);
        const blackPawn = Pawn.black(4, 5);
        const position = new Position([ whitePawn, blackPawn ]);

        whitePawn.setPotentialSquares(position);
        blackPawn.setPotentialSquares(position);

        expect(whitePawn.mightMoveTo(new Square(5, 6))).toBe(false);
        expect(blackPawn.mightMoveTo(new Square(4, 3))).toBe(false);
    });

    test("Pawn may move 2 squares ahead if sitting on starting row", () => {
        const whitePawn = Pawn.white(5, 2);
        const blackPawn = Pawn.black(4, 7);
        const position = new Position([ whitePawn, blackPawn ]);

        whitePawn.setPotentialSquares(position);
        blackPawn.setPotentialSquares(position);

        expect(whitePawn.mightMoveTo(new Square(5, 4))).toBe(true);
        expect(blackPawn.mightMoveTo(new Square(4, 5))).toBe(true);
    });

    test("Pawn cannot move on a square occupied by a same color piece", () => {
        const pawn1 = Pawn.white(5, 4);
        const pawn2 = Pawn.white(4, 2);
        const position = new Position([
            Knight.white(5, 5),
            Bishop.white(4 ,4),
        ]);

        pawn1.setPotentialSquares(position);
        pawn2.setPotentialSquares(position);

        expect(pawn1.mightMoveTo(new Square(5 ,5))).toBe(false);

        expect(pawn2.mightMoveTo(new Square(4, 3))).toBe(true);
        expect(pawn2.mightMoveTo(new Square(4, 4))).toBe(false);
    });

    test("Pawn cannot move on a square occupied by an opponent's piece", () => {
        const pawn1 = Pawn.white(5, 4);
        const pawn2 = Pawn.white(4, 2);
        const position = new Position([
            Knight.black(5, 5),
            Bishop.black(4 ,4),
        ]);

        pawn1.setPotentialSquares(position);
        pawn2.setPotentialSquares(position);

        expect(pawn1.mightMoveTo(new Square(5 ,5))).toBe(false);

        expect(pawn2.mightMoveTo(new Square(4, 3))).toBe(true);
        expect(pawn2.mightMoveTo(new Square(4, 4))).toBe(false);
    });

    test("Pawn cannot move backwards", () => {
        const pawn = Pawn.black(3, 6);
        const position = new Position([]);

        pawn.setPotentialSquares(position);

        expect(pawn.mightMoveTo(new Square(3, 7))).toBe(false);
    });

    test("Pawn can capture to its immediate foreward diagonal squares", () => {
        const pawn = Pawn.white(5, 4);
        const position = new Position([
            Knight.black(4, 5),
            Bishop.black(6, 5),
        ]);

        pawn.setPotentialSquares(position);

        expect(pawn.mightMoveTo(new Square(4, 5))).toBe(true);
        expect(pawn.mightMoveTo(new Square(6, 5))).toBe(true);
    });

    test("Pawn cannot capture on empty squares", () => {
        const pawn = Pawn.black(4, 5);
        const position = new Position([]);

        pawn.setPotentialSquares(position);

        expect(pawn.mightMoveTo(new Square(3, 4))).toBe(false);
        expect(pawn.mightMoveTo(new Square(5, 4))).toBe(false);
    });

    test("pawn cannot capture pieces of same color", () => {
        const pawn = Pawn.white(5, 4);
        const position = new Position([
            Knight.white(4, 5),
            Bishop.white(6, 5),
        ]);

        pawn.setPotentialSquares(position);

        expect(pawn.mightMoveTo(new Square(4, 5))).toBe(false);
        expect(pawn.mightMoveTo(new Square(6, 5))).toBe(false);
    });

    describe("En-passant potential moves", () => {
        test("Pawn might capture en-passant", () => {
            const lastMove = new Move(new Square(4,7), new Square(4,5));

            const whitePawn = Pawn.white(3,5);
            const blackPawn = Pawn.black(4,5);
            blackPawn.lastMove = lastMove;

            const position = new Position([ blackPawn ]);
            position.lastMove = lastMove;

            whitePawn.setPotentialSquares(position);

            expect(whitePawn.mightMoveTo(new Square(4,6))).toBe(true);
        });

        test("Pawn cannot capture en-passant if opponent's pawn two steps move wasn't its latest", () => {
            const whitePawn = Pawn.white(3,5);
            const blackPawn = Pawn.black(4,5);
            blackPawn.lastMove = new Move(new Square(4,7), new Square(4,5));

            const position = new Position([ blackPawn ]);
            position.lastMove = new Move(new Square(8,1), new Square(8,4));

            whitePawn.setPotentialSquares(position);

            expect(whitePawn.mightMoveTo(new Square(4,6))).toBe(false);
        })

        test("Pawn cannot capture en-passant if opponent's pawn move wasn't a two steps move", () => {
            const whitePawn = Pawn.white(3,5);
            const blackPawn = Pawn.black(4,5);
            blackPawn.lastMove = new Move(new Square(4,6), new Square(4,5));

            const position = new Position([ blackPawn ]);
            position.lastMove = new Move(new Square(4,6), new Square(4,5));

            whitePawn.setPotentialSquares(position);

            expect(whitePawn.mightMoveTo(new Square(4,6))).toBe(false);
        })
    });
});