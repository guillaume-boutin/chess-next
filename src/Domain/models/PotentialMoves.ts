import { Color, Move, Position, Square } from ".";
import { PieceMechanics } from "./PieceMechanics";

class PotentialMoves {
    private _position: Position;
    private _moves: Move[] = [];

    constructor(position: Position) {
        this._position = position;
        this._setMoves();
    }

    get all(): Move[] {
        return this._moves;
    }

    forColor(color: Color): Move[] {
        return this._moves.filter(m =>
            this._position.getPiece(m.start).color.equals(color)
        );
    }

    isControlledByColor(color: Color, square: Square) {
        return this.all.findIndex(move =>
            move.end.equals(square)
            && this._position.getPiece(move.start).color.equals(color)
        ) > -1;
    }

    private _setMoves() {
        const mechanics = this._position.pieces.map(p => PieceMechanics.make(p.square, this._position));

        this._moves = mechanics.reduce((moves: Move[], mechanics: PieceMechanics) => [
            ...moves,
            ...mechanics.potentialSquare.map(ps => new Move(mechanics.square, ps))
        ], []);
    }
}

export default PotentialMoves;