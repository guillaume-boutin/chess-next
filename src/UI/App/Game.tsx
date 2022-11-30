"use client";

import { useState, useEffect } from "react";
import { Board } from ".";
import { Game as GameModel, Board as BoardModel, Move as MoveModel } from "../../Domain/models";
import { initialPosition } from "../../Domain/models/initialPosition";

// interface IProps {
//     model: GameModel
// }

function Game() {
    const position = initialPosition();
    const board = new BoardModel(position);

    const [ model, setModel ] = useState<GameModel>(new GameModel(board));

    const onMove = (move: MoveModel): void => {
        model.tryMove(move);
        setModel(model);
    }

    return <Board model={model.board} onMove={onMove} />
}

export default Game;