"use client";

import { useState } from "react";
import { Board } from ".";
import { Game as GameModel, Board as BoardModel, Move as MoveModel, Color, Square as SquareModel } from "../../Domain/models";
import { initialPosition } from "../../Domain/models/initialPosition";
import { Piece as PieceModel } from "../../Domain/models/Pieces";

function Game() {
    const [ model, setModel ] = useState<GameModel>(new GameModel(
        new BoardModel(initialPosition(), Color.white())
    ));
    const [ grabbedPiece, setGrabbedPiece ] = useState<PieceModel>(PieceModel.null());

    function onBoardClick(e: { square: SquareModel, piece: PieceModel}) {
        if (grabbedPiece.isNull)
            return _tryGrabPiece(e.piece);

        if (e.piece.color.equals(model.toPlay))
            return setGrabbedPiece(e.piece);

        const move = new MoveModel(grabbedPiece.square, e.square);

        _applyMove(move);
        setGrabbedPiece(PieceModel.null);
    }

    function _tryGrabPiece(piece: PieceModel) {
        if (!piece.color.equals(model.toPlay)) return;

        setGrabbedPiece(piece);
    }

    function _applyMove(move: MoveModel) {
        if (!model.isLegal(move)) return;

        const moved = model.tryMove(move);

        if (moved) setGrabbedPiece(PieceModel.null());

        setModel(model);
    }

    return <Board model={model.board} onClick={onBoardClick} grabbedPiece={grabbedPiece} />
}

export default Game;