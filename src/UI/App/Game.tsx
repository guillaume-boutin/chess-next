"use client";

import { useState, useEffect } from "react";
import { Board } from ".";
import { Game as GameModel, Board as BoardModel, Move as MoveModel, Position, Color } from "../../Domain/models";
import { initialPosition } from "../../Domain/models/initialPosition";

// interface IProps {
//     model: GameModel
// }

function Game() {
    const [ board, setBoard ] = useState<BoardModel>(new BoardModel(initialPosition(), Color.white()));

    const onMove = (move: MoveModel): void => {
        if (!board.isLegal(move)) return;

        board.applyMove(move);
        punch();
    }

    function punch() {
        setBoard(board);
    }

    return <Board model={board} onMove={onMove} />
}

export default Game;