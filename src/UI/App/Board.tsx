"use client";

import style from "./Board.module.css";
import { Square } from ".";
import { Board as BoardModel, Square as SquareModel, Move as MoveModel, Color } from "../../Domain/models";
import { Piece as PieceModel } from "../../Domain/models/Pieces";

interface IProps {
    model: BoardModel,
    onClick: (e: { square: SquareModel, piece: PieceModel }) => void,
}

function Board ({ model, onClick }: IProps) {
    function makeSquares(): SquareModel[] {
        let squares: SquareModel[] = [];

        for (let y = 8; y > 0; y--) {
            for (let x = 1; x < 9; x ++) {
                squares = [...squares, new SquareModel(x, y)]
            }
        }

        return squares;
    }

    function onSquareClick(e: { square: SquareModel, piece: PieceModel }) {
        onClick(e);
    }

    return (
        <div className={style.board}>
        { makeSquares().map((square, i) => {
            const piece = model.position.getPiece(square);

            return (
                <Square
                    key={i}
                    x={square.x}
                    y={square.y}
                    piece={piece}
                    onClick={onSquareClick} />
            )
        })}
        </div>
    )
}

export default Board;