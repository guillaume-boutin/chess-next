"use client";

import { useState, useEffect } from "react";
import { Board } from ".";
import { Game as GameModel, Board as BoardModel, Move as MoveModel, Position, Color } from "../../Domain/models";
import { initialPosition } from "../../Domain/models/initialPosition";

// interface IProps {
//     model: GameModel
// }

function Game() {
    const [ board, setBoard ] = useState<BoardModel>(new BoardModel(new Position([])));
    const [ toPlay, setToPlay ] = useState<Color>(Color.white());

    useState(() => {
        const position = initialPosition();
        const board = new BoardModel(position);

        setBoard(board);
    });

    const onMove = (move: MoveModel): void => {
        if (!board.isLegal(move)) return;

        board.applyMove(move);
        setBoard(board);
        punch();
    }

    function punch() {
        setToPlay(toPlay.opposite);
    }

    return <Board model={board} toPlay={toPlay} onMove={onMove} />
}

export default Game;