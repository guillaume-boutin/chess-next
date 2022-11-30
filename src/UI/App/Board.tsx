"use client";

import style from "./Board.module.css";
import { Square } from ".";
import { useState } from "react";
import { Board as BoardModel, Square as SquareModel, Move as MoveModel } from "../../Domain/models";
import { Piece as PieceModel } from "../../Domain/models/Pieces";

interface IProps {
    model: BoardModel,
    onMove: (e: MoveModel) => void
}

function Board ({ model, onMove }: IProps) {
    const [ grabbedPiece, setGrabbedPiece ] = useState<PieceModel>(PieceModel.null())

    function makeSquares(): SquareModel[] {
        let squares: SquareModel[] = [];

        for (let y = 8; y > 0; y--) {
            for (let x = 1; x < 9; x ++) {
                squares = [...squares, new SquareModel(x, y)]
            }
        }

        return squares;
    }

    function onSquareClick(e: {x: number, y: number, piece: PieceModel | null}) {
        const square = new SquareModel(e.x, e.y);

        const newGrabbedPiece = model.position.getPiece(square);

        if (grabbedPiece.isNull)
            return setGrabbedPiece(newGrabbedPiece);

        const move = new MoveModel(grabbedPiece.square, square);
        setGrabbedPiece(PieceModel.null());

        onMove(move);
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