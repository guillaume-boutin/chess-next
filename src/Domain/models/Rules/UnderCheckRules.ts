import { Color, Position, PotentialMoves } from "..";

class UnderCheckRules {
    private _color: Color;
    private _position: Position;
    private _potentialMoves: PotentialMoves;

    constructor(color: Color, position: Position) {
        this._color = color;
        this._position = position;
        this._potentialMoves = new PotentialMoves(position);
    }

    get color(): Color {
        return this._color;
    }

    get position(): Position {
        return this._position;
    }

    get potentialMoves(): PotentialMoves {
        return this._potentialMoves;
    }

    isUnderCheck(): boolean {
        const king = this.position.pieces.find(piece =>
            piece.color.equals(this.color) && piece.isKing
        );

        if (!king) return false;

        return this
            .potentialMoves
            .isControlledByColor(king.color.opposite, king.square);
    }
}

export default UnderCheckRules;