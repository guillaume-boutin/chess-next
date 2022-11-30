import { describe, test, expect } from "@jest/globals";
import { Color } from ".";
import Move from "./Move";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./Pieces";
import Position from "./Position";
import Square from "./Square";

describe("Position class", () => {
    describe("position.getPiece method", () => {
        test("method returns a piece", () => {
            const position = new Position([ King.white(3, 6) ]);
            const piece = position.getPiece( new Square(3, 6));

            expect(piece).toBeInstanceOf(King);
        });

        test("method returns a null piece if there is not piece", () => {
            const position = new Position([]);
            const piece = position.getPiece(new Square(3, 6));

            expect(piece.isNull).toBe(true);
        });
    });

    describe("position.removePiece method", () => {
        test("Position.removePiece method removes a piece from the position", () => {
            const position = new Position([ Rook.black(4, 7) ]);
            position.removePiece(new Square(4, 7));

            expect(position.getPiece(new Square(4, 7)).isNull).toBe(true);
        });
    });

    describe("Position.applyMove method", () => {
        test("Position.applyMove method moves a piece from one square to another", () => {
            const position = new Position([ Knight.white(2, 5) ]);
            position.applyMove(new Move(new Square(2, 5), new Square(4, 6)));

            expect(position.getPiece(new Square(4, 6))).toBeInstanceOf(Knight);
        });

        test("Position.applyMove method sets the last move for the piece", () => {
            const position = new Position([ Bishop.black(2, 7) ]);
            const move = new Move(new Square(2, 7), new Square(3, 6));
            position.applyMove(move);

            const pieceLastMove = position.getPiece(move.end).lastMove;
            expect(pieceLastMove.equals(move)).toBe(true);
        });

        test("Position.applyMove method replaces the piece on the end square by the one on the start square", () => {
            const position = new Position([ Queen.white(8, 4), Rook.black(3, 4) ]);
            const move = new Move(new Square(8, 4), new Square(3, 4));
            position.applyMove(move);

            expect(position.getPiece(move.end)).toBeInstanceOf(Queen);
            expect(position.pieces.length).toBe(1);
        });

        test("Position.applyMove sets the last move for the position", () => {
            const position = new Position([ Pawn.black(3, 7) ]);
            const move = new Move(new Square(3, 7), new Square(3, 5));
            position.applyMove(move);

            expect(position.lastMove.equals(move)).toBe(true);
        });
    });

    describe("Position.isOccupied method", () => {
        test("Position.isOccupied method returns true if a square is occupied by a any piece", () => {
            const position = new Position([ King.white(7, 4) ]);

            expect(position.isOccupied(new Square(7, 4))).toBe(true);
        });

        test("Position.isOccupied method returns false if a square is not occupied by a any piece", () => {
            const position = new Position([]);

            expect(position.isOccupied(new Square(3, 1))).toBe(false);
        });
    });

    describe("Position.isOccupiedByColor method", () => {
        test("Position.isOccupiedByColor method returns true if square is occupied by any piece of a specified color", () => {
            const position = new Position([ Bishop.black(7, 8) ]);

            expect(position.isOccupiedByColor(Color.black(), new Square(7, 8))).toBe(true);
        });

        test("Position.isOccupiedByColor method returns false if square is occupied by any piece of opposite color", () => {
            const position = new Position([ Queen.white(5, 2) ]);

            expect(position.isOccupiedByColor(Color.black(), new Square(5, 2))).toBe(false);
        });

        test("Position.isOccupiedByColor method returns false if square is not occupied at all", () => {
            const position = new Position([]);

            expect(position.isOccupiedByColor(Color.white(), new Square(1, 6))).toBe(false);
        });
    });
})