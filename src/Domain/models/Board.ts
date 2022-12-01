import { Color, Move, Position } from ".";

class Board {
    public position: Position;

    public toPlay: Color;

    public legalMoves: Move[] = [];

    constructor(position: Position, toPlay: Color) {
        this.position = position;
        this.toPlay = toPlay;
        this.setLegalMoves(toPlay);
    }

    isLegal(move: Move): boolean {
        return this.legalMoves.findIndex(lm => lm.equals(move)) > -1;
    }

    applyMove(move: Move) {
        this.position.applyMove(move);
        this.toPlay = this.toPlay.opposite;
        this.setLegalMoves(this.toPlay);
    }

    setLegalMoves(color: Color) {
        const potentialMoves = this.position.potentialMoves.getByColor(color);

        this.legalMoves = potentialMoves.filter(pm => {
            const possiblePosition = new Position(this.position.pieces.map(p => p.copy()));
            possiblePosition.applyMove(pm);

            return !possiblePosition.isKingUnderCheck(color)
        });
    }
}

export default Board;