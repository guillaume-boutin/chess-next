import { describe, test, expect } from "@jest/globals";
import { Move, Position, Square } from "..";
import { PieceType } from "../../enums/PieceType";
import { Pawn, Rook } from "../Pieces";
import PromotionRules from "./PromotionRules";

describe("Promotion Rules", () => {
    describe("attemptingPromotion method", () => {
        test("Rules can tell if a move is a promotion", () => {
            const startSquare = new Square(2, 7);
            const endSquare = new Square(2, 8);
            const move = new Move(startSquare, endSquare, PieceType.QUEEN);

            const position = new Position([ Pawn.white(2, 7) ]);

            const rules = new PromotionRules(move, position);

            expect(rules.attemptingPromotion()).toBe(true);
        });

        test("Rule can tell move is not a promotion if piece is not a pawn", () => {
            const startSquare = new Square(2, 7);
            const endSquare = new Square(2, 8);
            const move = new Move(startSquare, endSquare, PieceType.QUEEN);

            const position = new Position([ Rook.white(2, 7) ]);

            const rules = new PromotionRules(move, position);

            expect(rules.attemptingPromotion()).toBe(false);
        });

        test("Rule can tell move by white is not a promotion if it doesn't reach for 8th row", () => {
            const startSquare = new Square(2, 6);
            const endSquare = new Square(2, 7);
            const move = new Move(startSquare, endSquare, PieceType.QUEEN);

            const position = new Position([ Pawn.white(2, 6) ]);

            const rules = new PromotionRules(move, position);

            expect(rules.attemptingPromotion()).toBe(false);
        });

        test("Rule can tell move by black is not a promotion if move it doesn't reach for 1st row", () => {
            const startSquare = new Square(5, 3);
            const endSquare = new Square(5, 2);
            const move = new Move(startSquare, endSquare, PieceType.QUEEN);

            const position = new Position([ Pawn.black(5, 3) ]);

            const rules = new PromotionRules(move, position);

            expect(rules.attemptingPromotion()).toBe(false);
        });

        test("Rule can tell move is not a promotion if it doesn't specify the promoted piece", () => {
            const start = new Square(4, 7);
            const end = new Square(4, 8);
            const move = new Move(start, end);
            const position = new Position([ Pawn.white(4, 7) ]);

            const rules = new PromotionRules(move, position);

            expect(rules.attemptingPromotion()).toBe(false);
        });
    });

    describe("apply method", () => {
        test("Rules can apply promotion move of a queen", () => {
            const move = new Move(new Square(6,7), new Square(6,8), PieceType.QUEEN);
            let position = new Position([ Pawn.black(6, 7) ]);
            const rules = new PromotionRules(move, position);

            position = rules.apply();

            expect(position.getPiece(move.end).isQueen).toBe(true);
            expect(position.getPiece(move.start).isNull).toBe(true);
        });

        test("Rules can apply promotion move of a knight", () => {
            const move = new Move(new Square(4, 2), new Square(4, 1), PieceType.KNIGHT);
            let position = new Position([ Pawn.white(6, 7) ]);
            const rules = new PromotionRules(move, position);

            position = rules.apply();

            expect(position.getPiece(move.end).isKnight).toBe(true);
            expect(position.getPiece(move.start).isNull).toBe(true);
        });

        test("Rules can apply promotion move of a bishop", () => {
            const move = new Move(new Square(1, 2), new Square(1, 1), PieceType.BISHOP);
            let position = new Position([ Pawn.black(1, 2) ]);
            const rules = new PromotionRules(move, position);

            position = rules.apply();

            expect(position.getPiece(move.end).isBishop).toBe(true);
            expect(position.getPiece(move.start).isNull).toBe(true);
        });

        test("Rules can apply promotion move of a rook", () => {
            const move = new Move(new Square(7, 7), new Square(7, 8), PieceType.ROOK);
            let position = new Position([ Pawn.black(7, 7) ]);
            const rules = new PromotionRules(move, position);

            position = rules.apply();

            expect(position.getPiece(move.end).isRook).toBe(true);
            expect(position.getPiece(move.start).isNull).toBe(true);
        });
    });
});