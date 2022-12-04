import { describe, test, expect } from "@jest/globals"
import { EnPassantRules } from ".";
import { Color, Move, Position, Square } from "..";
import { Pawn } from "../Pieces";

describe("En-passant rules", () => {
    test("Rules can tell if a move is a en-passant attempt", () => {
        const position = new Position([ Pawn.white(4, 5), Pawn.black(3, 5) ]);
        const move = new Move(new Square(4, 5), new Square(3, 6));
        const rules = new EnPassantRules(move, position);

        expect(rules.attemptingEnPassant()).toBe(true);
    });

    test("Rules can apply en-passant move to the position", () => {
        let position = new Position([ Pawn.black(7, 4), Pawn.white(6, 4) ]);
        const move = new Move(new Square(7, 4), new Square(6, 3));
        const rules = new EnPassantRules(move, position);

        position = rules.apply();

        expect(position.getPiece(new Square(6, 4)).isNull).toBe(true);
        expect(position.getPiece(move.end).isPawn).toBe(true);
        expect(position.getPiece(move.end).color.equals(Color.black())).toBe(true);
    });
});