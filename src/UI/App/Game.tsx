"use client";

import { useState } from "react";
import { Board } from ".";
import { Game as GameModel, Board as BoardModel, Move as MoveModel } from "../../Domain/models";
import { initialPosition } from "../../Domain/models/initialPosition";

// interface IProps {
//     model: GameModel
// }

function Game() {
    const position = initialPosition();
    const board = new BoardModel(position);
    const model = new GameModel(board)

    const [ game, setGame ] = useState<GameModel>(model);

    const onMove = (move: MoveModel): void => {
        model.tryMove(move);
        setGame(model);
    }

    return <Board model={game.board} onMove={onMove} />
}

export default Game;