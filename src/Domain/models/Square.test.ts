import { describe, test, expect } from "@jest/globals";
import Square from "./Square";

describe("Square class", () => {
    describe("Square.equals", () => {
        test("Two squares of same values are equal", () => {
            const square1 = new Square(3,8);
            const square2 = new Square(3,8);

            expect(square1.equals(square2)).toBe(true);
        });

        test("Two squares of different values are not equal", () => {
            const square1 = new Square(3,8);
            const square2 = new Square(2,3);

            expect(square1.equals(square2)).toBe(false);
        });
    });

    describe("Square.plus", () => {
        test("method add coordinates of two squares", () => {
            const square1 = new Square(2,4);
            const square2 = new Square(3,4);

            expect(square1.plus(square2).equals(new Square(5, 8))).toBe(true);
        })
    })

    describe("Square.minus", () => {
        test("method subtracts coordinates of from a square by another", () => {
            const square1 = new Square(7,6);
            const square2 = new Square(3,4);

            expect(square1.minus(square2).equals(new Square(4, 2))).toBe(true);
        })
    })
})