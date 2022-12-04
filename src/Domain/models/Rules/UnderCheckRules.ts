import { Color, Position, PotentialMoves, Square } from "..";

class UnderCheckRules {
    private _position: Position;
    private _potentialMoves: PotentialMoves;

    constructor(position: Position) {
        this._position = position;
        this._potentialMoves = new PotentialMoves(position);
    }

    get position(): Position {
        return this._position;
    }

    get potentialMoves(): PotentialMoves {
        return this._potentialMoves;
    }

    isUnderCheck(color: Color): boolean {
        const king = this.position.pieces.find(piece =>
            piece.color.equals(color) && piece.isKing
        );

        if (!king) return false;

        return this
            .potentialMoves
            .isControlledByColor(king.color.opposite, king.square);
    }
}

export default UnderCheckRules;