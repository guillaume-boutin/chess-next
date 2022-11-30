import { describe, test, expect } from "@jest/globals";
import Color from "./Color";
import Move from "./Move";
import { Bishop, King, Knight, Queen, Rook } from "./Pieces";
import Position from "./Position";
import Square from "./Square";

describe("Position class", () => {
    describe("position.getPiece method", () => {
        test("method returns a piece", () => {
            const position = new Position([
                King.white(3, 6)
            ]);

            const piece = position.getPiece( new Square(3, 6));

            expect(piece).toBeInstanceOf(King);
        });

        test("method returns null if there is not piece", () => {
            const position = new Position([]);

            const piece = position.getPiece(new Square(3, 6));

            expect(piece.isNull).toBe(true);
        });
    });

    describe("position.removePiece method", () => {
        test("method removes a piece", () => {
            const position = new Position([
                Bishop.black(7, 2)
            ]);

            position.removePiece(new Square(7, 2));

            expect(position.getPiece(new Square(7, 2)).isNull).toBe(true)
        });
    });

    describe("position.movePiece method", () => {
        test("method moves a piece from one square to another", () => {
            const position = new Position([
                Rook.white(2, 5)
            ]);

            const startSquare = new Square(2, 5);
            const endSquare = new Square(7, 3)

            position.movePiece(new Move(startSquare, endSquare));

            expect(position.getPiece(startSquare).isNull).toBe(true)
            expect(position.getPiece(endSquare)).toBeInstanceOf(Rook);
        });

    });

    describe("position.isOccupiedByColor method", () => {
        test("method returns true if a square is occupied by a piece of same color", () => {
            const position = new Position([
                Rook.white(5,2)
            ]);

            expect(position.isOccupiedByColor(Color.white(), new Square(5, 2))).toBe(true);
        });

        test("method returns false if a square is occupied by a piece of opposite color", () => {
            const position = new Position([
                Rook.black(5,2)
            ]);

            expect(position.isOccupiedByColor(Color.white(), new Square(5, 2))).toBe(false);
        });

        test("method returns false if a square not occupied", () => {
            const position = new Position([]);

            expect(position.isOccupiedByColor(Color.white(), new Square(5, 2))).toBe(false);
        });
    })
})