"use client";

import style from "./Board.module.css";
import { Square } from ".";
import { useState } from "react";
import { Position } from "../../Domain/models";
import { initialPosition } from "../../Domain/models/initialPosition";
import { Square as SquareModel, Move as MoveModel } from "../../Domain/models";
import { Piece as PieceModel } from "../../Domain/models/Pieces";

function Board () {
    const [ position, setPosition ] = useState<Position>(new Position(initialPosition()));

    const [ grabbedPiece, setGrabbedPiece ] = useState<PieceModel | null>(null);

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

        if (grabbedPiece) {
            if (grabbedPiece.square.equals(new SquareModel(e.x, e.y))) return;

            console.log(grabbedPiece.square, square);

            position.applyMove(new MoveModel(grabbedPiece.square, square));
            setGrabbedPiece(null);
            return setPosition(position);
        }

        if (!e.piece) return;

        setGrabbedPiece(e.piece);
    }

    function _handleSquareClick() {
        console.log("click");
    }

    return (
        <div className={style.board}>
            { makeSquares().map((square, i) => {
                const piece = position.pieces.find(p => p.square.equals(square)) ?? null

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