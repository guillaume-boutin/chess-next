import { Color, Move, Position } from ".";
import { PieceMechanics } from "./PieceMechanics";
import { Pawn } from "./Pieces";

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

    getByColor(color: Color): Move[] {
        return this._moves.filter(m =>
            this._position.getPiece(m.start).color.equals(color)
        );
    }

    threateningFor(color: Color) {
        return this
            .getByColor(color.opposite)
            .filter(move => {
                const piece = this._position.getPiece(move.start);

                if (!(piece instanceof Pawn)) return true;

                return move.end.minus(move.start).x !== 0;
            });
    }

    private _setMoves() {
        const mechanics = this._position.pieces.map(p => PieceMechanics.make(p.square, this._position));

        this._moves = mechanics.reduce((moves: Move[], mechanics: PieceMechanics) =>
            [
                ...moves,
                ...mechanics.potentialSquare.map(ps => new Move(mechanics.square, ps))
            ],
        []);
    }
}

export default PotentialMoves;