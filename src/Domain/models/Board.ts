import { Color, Move, Position, PotentialMoves } from ".";
import { PieceType } from "../enums/PieceType";
import { CastleRules, EnPassantRules, PromotionRules, UnderCheckRules } from "./Rules";
import { PromotionType } from "../enums/PieceType";

class Board {
    private _position: Position;
    private _toPlay: Color;
    private _legalMoves: Move[] = [];

    constructor(position: Position, toPlay: Color) {
        this._position = position;
        this._toPlay = toPlay;
        this._setLegalMoves();
    }

    get position(): Position {
        return this._position;
    }

    get toPlay(): Color {
        return this._toPlay;
    }

    get legalMoves(): Move[] {
        return this._legalMoves;
    }

    isLegal(move: Move): boolean {
        if (!this.position.isOccupiedByColor(this.toPlay, move.start)) return false;

        return this.legalMoves.findIndex(lm => {
            if (move.promotion !== PieceType.NULL) move = new Move(move.start, move.end);

            return move.equals(lm);
        }) > -1;
    }

    applyMove(move: Move) {
        const castleRules = new CastleRules(move, this.position);

        if (castleRules.attemptingCastle()) {
            this._position = castleRules.apply();
            return;
        }

        const enPassantRules = new EnPassantRules(move, this.position);
        if (enPassantRules.attemptingEnPassant()) {
            this._position = enPassantRules.apply();
            return;
        }

        const promotionRules = new PromotionRules(move, this.position);
        if (promotionRules.attemptingPromotion()) {
            this._position = promotionRules.apply();
            return;
        }

        this._position = this.position.apply(move);
    }

    punch() {
        this._toPlay = this._toPlay.opposite;
        this._setLegalMoves();
    }

    private _setLegalMoves() {
        const potentialMoves = new PotentialMoves(this.position);

        this._legalMoves = potentialMoves
            .forColor(this.toPlay)
            .filter(move => {
                // reject if move puts under a check
                if (new UnderCheckRules(this.toPlay, this.position.apply(move)).isUnderCheck())
                    return false;

                // reject if move is a failed attempt to castle
                const castleRules = new CastleRules(move, this.position);
                if (castleRules.attemptingCastle())
                    return castleRules.isLegal();

                // reject move if it's a failed attempt to promote
                if (move.promotion !== PieceType.NULL)
                    return new PromotionRules(move, this.position).isLegal();

                // move is legal
                return true;
            });
    }
}

export default Board;