"use client";

import style from "./Board.module.css";
import { Square } from ".";
import { useState } from "react";
import { Board as BoardModel, Square as SquareModel, Move as MoveModel, Color } from "../../Domain/models";
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

        if (grabbedPiece.isNull)
            return _tryGrabPiece(square);

        const endPiece = model.position.getPiece(square);

        if (endPiece.color.equals(model.toPlay)) {
            setGrabbedPiece(endPiece);
            return;
        }

        const move = new MoveModel(grabbedPiece.square, square);

        onMove(move);
        setGrabbedPiece(PieceModel.null);
    }

    function _tryGrabPiece(square: SquareModel) {
        const piece = model.position.getPiece(square);

        if (!piece.color.equals(model.toPlay)) return;

        setGrabbedPiece(piece);
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