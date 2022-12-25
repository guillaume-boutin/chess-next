"use client";

import { useState } from "react";
import { Board } from ".";
import { PromotionType } from "../../Domain/enums/PieceType";
import { Game as GameModel, Board as BoardModel, Move as MoveModel, Color, Square as SquareModel } from "../../Domain/models";
import { initialPosition } from "../../Domain/models/initialPosition";
import { Piece as PieceModel } from "../../Domain/models/Pieces";
import { PromotionRules } from "../../Domain/models/Rules";

function Game() {
    const [ model, setModel ] = useState<GameModel>(new GameModel(
        new BoardModel(initialPosition(), Color.white())
    ));
    const [ grabbedPiece, setGrabbedPiece ] = useState<PieceModel>(PieceModel.null());
    const [ promotingSquare, setPromotingSquare ] = useState<SquareModel>(SquareModel.null());

    function onBoardClick(e: { square: SquareModel, piece: PieceModel}) {
        if (grabbedPiece.isNull)
            return _tryGrabPiece(e.piece);

        if (e.piece.color.equals(model.toPlay))
            return setGrabbedPiece(e.piece);

        const move = new MoveModel(grabbedPiece.square, e.square);

        if (new PromotionRules(move, model.board.position).attemptingPromotion()) {
            setPromotingSquare(move.end);
            return;
        }

        _applyMove(move);
        setGrabbedPiece(PieceModel.null);
    }

    function _tryGrabPiece(piece: PieceModel) {
        if (!piece.color.equals(model.toPlay)) return;

        setGrabbedPiece(piece);
    }

    function _applyMove(move: MoveModel) {
        const moved = model.tryMove(move);

        if (!moved) return;

        setGrabbedPiece(PieceModel.null());
        setPromotingSquare(SquareModel.null());
        setModel(model);
    }

    function _onPromotionPick(e: PromotionType) {
        const move = new MoveModel(grabbedPiece.square, promotingSquare, e);
        _applyMove(move);
    }

    return <Board
        model={model.board}
        viewAs={Color.white()}
        onClick={onBoardClick}
        grabbedPiece={grabbedPiece}
        promotingSquare={promotingSquare}
        onPromotionPiecePick={_onPromotionPick} />
}

export default Game;