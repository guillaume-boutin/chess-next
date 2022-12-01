import Color from "./Color";
import { King, Piece } from "./Pieces";
import { Move, PotentialMoves, Square } from ".";

class Position {
    public pieces: Piece[];

    public lastMove: Move = Move.null();

    public potentialMoves: PotentialMoves;

    constructor (pieces: Piece[]) {
        this.pieces = pieces;
        this.potentialMoves = new PotentialMoves(this);
    }

    applyMove(move: Move) {
        const piece = this.getPiece(move.start);
        if (piece.isNull) return;

        this.removePiece(move.end);
        piece.move(move.end);
        this.lastMove = move;

        this.potentialMoves = new PotentialMoves(this);
    }

    getPiece(square: Square): Piece {
        return this.pieces.find(p => p.square.equals(square)) || Piece.null();
    }

    removePiece(square: Square): void {
        var index = this.pieces.findIndex(p => p.square.equals(square));

        if (index === -1) return;

        let pieces = [ ...this.pieces ];
        pieces = [ ...pieces.slice(0, index), ...pieces.slice(index+1) ];
        this.pieces = pieces;
    }

    isOccupied(square: Square) {
        return !this.getPiece(square).isNull;
    }

    isOccupiedByColor(color: Color, square: Square) {
        const piece = this.getPiece(square);

        if (piece.isNull) return false;

        return piece.color.equals(color);
    }

    isKingUnderCheck(color: Color) {
        const threateningMoves = this.potentialMoves.getKingsThreateningMoves(color);

        const king = this.pieces.find(piece => (piece instanceof King) && piece.color.equals(color)) || Piece.null();

        return threateningMoves.findIndex(move => move.end.equals(king.square)) > -1;
    }
}

export default Position;