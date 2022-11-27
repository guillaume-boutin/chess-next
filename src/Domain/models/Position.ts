import Color from "./Color";
import { Pawn, Piece } from "./Pieces";
import { Move, Square } from ".";

class Position {
    public pieces: Piece[];

    public lastMove: Move = Move.null();

    private _potentialMoves: Move[] = [];

    constructor (pieces: Piece[]) {
        this.pieces = pieces;

        this._setPotentialMoves();
    }

    get potentialMoves(): Move[] {
        return this._potentialMoves;
    }

    private _setPotentialMoves(): void {
        var moves: Move[] = [];

        this.pieces.forEach(piece => {
            piece.setPotentialSquares(this);

            moves = [
                ...moves,
                ...piece.potentialSquares.map(endSquare => new Move(piece.square, endSquare))
            ];
        });

        this._potentialMoves = moves;
    }

    applyMove(move: Move) {
        const startPiece = this.getPiece(move.start);
        if (!startPiece) return;

        this.removePiece(move.end);
        this.movePiece(move);
        this.lastMove = move;
    }

    getPiece(square: Square): Piece | null {
        return this.pieces.find(p => p.square.equals(square)) || null;
    }

    removePiece(square: Square): void {
        var index = this.pieces.findIndex(p => p.square.equals(square));

        if (index === -1) return;

        let pieces = [ ...this.pieces ];
        pieces = [ ...pieces.slice(0, index), ...pieces.slice(index+1) ];
        this.pieces = pieces;
    }

    movePiece(move: Move): void {
        let index = this.pieces.findIndex(p => p.square.equals(move.start));

        if (index === -1) return;

        const piece = this.pieces[index];
        piece.square = move.end;
        piece.lastMove = move;
        this.pieces[index] = piece;
    }

    isOccupied(square: Square) {
        return this.getPiece(square) !== null;
    }

    isOccupiedByColor(color: Color, square: Square) {
        const piece = this.getPiece(square);

        if (! piece) return false;

        return piece.color.equals(color);
    }

    isPawnCapturing(move: Move): boolean {
        const piece = this.getPiece(move.start);

        if (!(piece instanceof Pawn)) return false;

        return move.end.minus(move.start).x !== 0;
    }
}

export default Position;