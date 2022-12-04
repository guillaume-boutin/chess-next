import { describe, test, expect } from "@jest/globals";
import { CastleRules } from ".";
import { Move, Position, Square } from "..";
import { King, Queen, Rook } from "../Pieces";

describe("Castle rules", () => {
    test("Rules recognize when a move is a castle attempt", () => {
        const position = new Position([
            King.white(5, 1), Rook.white(1, 1),
            King.black(5, 8), Rook.black(8, 8),
        ]);
        const whiteRules = new CastleRules(new Move(new Square(5,1), new Square(3,1)), position);
        const blackRules = new CastleRules(new Move(new Square(5,8), new Square(7,8)), position);

        expect(whiteRules.attemptingCastle()).toBe(true);
        expect(blackRules.attemptingCastle()).toBe(true);
    });

    test("Rules can tell if a move is not a castle attempt", () => {
        const position = new Position([ King.black(5,8), Rook.black(1,8) ]);
        const move = new Move(new Square(5,8), new Square(4,8));
        const rules = new CastleRules(move, position);

        expect(rules.attemptingCastle()).toBe(false);
    });

    test("Rules can tell the rook's starting square", () => {
        const position = new Position([ King.black(5,8), Rook.black(8,8) ]);
        const move = new Move(new Square(5, 8), new Square(7, 8));
        const rules = new CastleRules(move, position);

        expect(rules.rookStartSquare.equals(new Square(8, 8))).toBe(true);
    });

    test("Rules can tell the rook's end square", () => {
        const position = new Position([ King.white(5,1), Rook.black(8,1) ]);
        const move = new Move(new Square(5, 1), new Square(7, 1));
        const rules = new CastleRules(move, position);

        expect(rules.rookEndSquare.equals(new Square(6, 1))).toBe(true);
    });

    test("Rules allow castle under normal circumstances", () => {
        const position = new Position([
            King.white(5, 1), Rook.white(8, 1),
            King.black(5, 8), Rook.black(1, 8),
        ]);
        const whiteRules = new CastleRules(new Move(new Square(5,1), new Square(7,1)), position);
        const blackRules = new CastleRules(new Move(new Square(5,8), new Square(3,8)), position);

        expect(whiteRules.isLegal()).toBe(true);
        expect(blackRules.isLegal()).toBe(true);
    });

    test("Rules don't allow castle if King is under a check", () => {
        const position = new Position([ King.white(5,1), Rook.white(8,1), Queen.black(5,7) ]);
        const move = new Move(new Square(5,1), new Square(7,1))
        const rules = new CastleRules(move, position);

        expect(rules.isLegal()).toBe(false);
    });

    test("Rules don't allow castle if King is crossing through a check", () => {
        const position = new Position([ King.black(5,8), Rook.black(8,8), Queen.white(6,2) ]);
        const move = new Move(new Square(5,8), new Square(7,8))
        const rules = new CastleRules(move, position);

        expect(rules.isLegal()).toBe(false);
    });

    test("Rules can apply a castle move on the position", () => {
        const position = new Position([ King.white(5, 1), Rook.white(1, 1)]);
        const move = new Move(new Square(5, 1), new Square(3, 1));
        const rules = new CastleRules(move, position);

        const newPosition = rules.apply();

        expect(newPosition.getPiece(move.end).isKing).toBe(true);
        expect(newPosition.getPiece(rules.rookEndSquare).isRook).toBe(true);
    });
})