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
    })
})