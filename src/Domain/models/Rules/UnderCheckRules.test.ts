import { describe, test, expect } from "@jest/globals";
import { UnderCheckRules } from ".";
import { Color, Position } from "..";
import { Bishop, King, Knight, Queen, Rook } from "../Pieces";

describe("UnderCheckRules", () => {
    test("A king on a square within an opponent piece's allowed mechanics is under a check", () => {
        const position = new Position([ King.white(5,3), Rook.black(5,7) ]);
        const rules = new UnderCheckRules(position);

        expect(rules.isUnderCheck(Color.white())).toBe(true);
    });

    test("A king on a square within a same color piece's allowed mechanics is not under a check", () => {
        const position = new Position([ King.black(7,7), Bishop.black(4,4) ]);
        const rules = new UnderCheckRules(position);

        expect(rules.isUnderCheck(Color.black())).toBe(false);
    });

    test("A king not on a square within any piece's mechanics is not under a check", () => {
        const position = new Position([ King.white(3,6) ]);
        const rules = new UnderCheckRules(position);

        expect(rules.isUnderCheck(Color.white())).toBe(false);
    });

    test("A king is not under a check if opponent's piece path is blocked by another opponent's piece", () => {
        const position = new Position([ King.black(2,7), Knight.white(2,5), Queen.white(2,1) ]);
        const rules = new UnderCheckRules(position);

        expect(rules.isUnderCheck(Color.black())).toBe(false);
    });

    test("A king is not under a check if opponent's piece path is blocked by one piece of his color", () => {
        const position = new Position([ King.white(7,2), Bishop.white(5,2), Rook.black(2,2) ]);
        const rules = new UnderCheckRules(position);

        expect(rules.isUnderCheck(Color.white())).toBe(false);
    });
});