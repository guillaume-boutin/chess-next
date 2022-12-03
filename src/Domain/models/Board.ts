import { Color, Move, Position, Square } from ".";
import { King } from "./Pieces";
import { CastleRules } from "./Rules";

class Board {
    public position: Position;

    public toPlay: Color;

    public legalMoves: Move[] = [];

    constructor(position: Position, toPlay: Color) {
        this.position = position;
        this.toPlay = toPlay;
        this._setLegalMoves(toPlay);
    }

    isLegal(move: Move): boolean {
        return this.legalMoves.findIndex(lm => lm.equals(move)) > -1;
    }

    applyMove(move: Move) {
        this.position.applyMove(move);
        this.toPlay = this.toPlay.opposite;
        this._setLegalMoves(this.toPlay);
    }

    _setLegalMoves(color: Color) {
        const potentialMoves = this.position.potentialMoves.getByColor(color);

        this.legalMoves = potentialMoves.filter(pm => {
            const possiblePosition = new Position(this.position.pieces.map(p => p.copy()));
            possiblePosition.applyMove(pm);

            if (possiblePosition.isKingUnderCheck(color)) return false;

            if (!new CastleRules(pm, this.position).isLegal()) return false;

            return true;
        });
    }
}

export default Board;