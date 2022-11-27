import { describe, test, expect } from "@jest/globals";
import { Bishop, King, Knight, Queen, Rook } from "./Pieces";
import Position from "./Position";
import Square from "./Square";

describe("Position class", () => {
    describe("position.at method", () => {
        test("method returns a piece", () => {
            const position = new Position([
                King.white(3, 6)
            ]);

            const piece = position.at(3, 6);

            expect(piece).toBeInstanceOf(King);
        });

        test("method returns null if there is not piece", () => {
            const position = new Position([]);

            const piece = position.at(3, 6);

            expect(piece).toBeNull();
        });
    });

    describe("position.removeAt method", () => {
        test("method removes a piece", () => {
            const position = new Position([
                Bishop.black(7, 2)
            ]);

            position.removeAt(7, 2);

            expect(position.at(7, 2)).toBeNull();
        });
    });

    describe("position.move method", () => {
        test("method moves a piece from one square to another", () => {
            const position = new Position([
                Rook.white(2, 5)
            ]);

            position.move(new Square(2, 5), new Square(7, 3));

            expect(position.at(2, 5)).toBeNull();
            expect(position.at(7, 3)).toBeInstanceOf(Rook);
        });

        test("method replaces the piece at end square by the one at start square", () => {
            const startSquare = new Square(4,8);
            const endSquare = new Square(1,4);

            const position = new Position([
                Knight.black(1,4),
                Queen.black(4,8),
            ]);

            position.move(startSquare, endSquare);

            expect(
                position.pieces.filter(p => p.square.equals(endSquare)).length
            ).toBe(1);
            expect(position.at(1,4)).toBeInstanceOf(Queen);
        });
    });
})