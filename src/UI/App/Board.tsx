"use client";

import style from "./Board.module.css";
import {Square} from ".";
import { useState } from "react";
import { Position } from "../../Domain/models";

function Board () {
    const [ position, setPosition ] = useState<Position>(new Position());

    function makeSquares(): { x: number, y: number }[] {
        let squares: { x: number, y: number }[] = [];

        for (let y = 8; y > 0; y--) {
            for (let x = 1; x < 9; x ++) {
                squares = [...squares, { x, y }]
            }
        }

        return squares;
    }

    return (
        <div className={style.board}>
            { makeSquares().map((square, i) => {
                const piece = position.pieces.find(p => p.x === square.x && p.y === square.y) ?? null

                return (
                    <Square
                        key={i}
                        x={square.x}
                        y={square.y}
                        piece={piece} />
                )
            })}
        </div>
    )
}

export default Board;