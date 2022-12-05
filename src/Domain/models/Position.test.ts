import { describe, test, expect } from "@jest/globals";
import { Color } from ".";
import { PieceType } from "../enums/PieceType";
import Move from "./Move";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./Pieces";
import Position from "./Position";
import Square from "./Square";

describe("Position class", () => {
    describe("position.copy method", () => {
        test("position.copy return a new instance of a position", () => {
            let position = new Position([]);
            let newPosition = position.copy();

            expect(position === position).toBe(true);
            expect(position === newPosition).toBe(false);
        });
    });

    describe("position.getPiece method", () => {
        test("method returns a piece", () => {
            const position = new Position([ King.white(3, 6) ]);
            const piece = position.getPiece( new Square(3, 6));

            expect(piece.isKing).toBe(true);
        });

        test("method returns a null piece if there is not piece", () => {
            const position = new Position([]);
            const piece = position.getPiece(new Square(3, 6));

            expect(piece.isNull).toBe(true);
        });
    });

    describe("Position.apply method", () => {
        test("Position.apply method moves a piece from one square to another", () => {
            const move = new Move(new Square(2, 5), new Square(4, 6));
            let position = new Position([ Knight.white(2, 5) ]);
            position = position.apply(move);

            expect(position.getPiece(move.start).isNull).toBe(true);
            expect(position.getPiece(move.end).isKnight).toBe(true);
        });

        test("Position.apply method replaces the piece on the end square by the one on the start square", () => {
            let position = new Position([ Queen.white(8, 4), Rook.black(3, 4) ]);
            const move = new Move(new Square(8, 4), new Square(3, 4));
            position = position.apply(move);

            expect(position.getPiece(move.end).isQueen).toBe(true);
            expect(position.pieces.length).toBe(1);
        });

        test("Position.apply sets the last move for the position", () => {
            let position = new Position([ Pawn.black(3, 7) ]);
            const move = new Move(new Square(3, 7), new Square(3, 5));
            position = position.apply(move);

            expect(position.lastMove.equals(move)).toBe(true);
        });

        test("Position.apply doesn't change any values from the original position", () => {
            const position = new Position([ Bishop.white(5, 6) ]);
            const move = new Move(new Square(5, 6), new Square(7, 4));
            const newPosition = position.apply(move);

            expect(newPosition.lastMove.equals(position.lastMove)).toBe(false);
            const newPiece = newPosition.getPiece(move.end);
            const piece = position.getPiece(move.start);
            expect(newPiece === piece).toBe(false);
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