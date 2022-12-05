"use client";

import style from "./Board.module.css";
import { Square } from ".";
import { Board as BoardModel, Square as SquareModel } from "../../Domain/models";
import { Piece as PieceModel } from "../../Domain/models/Pieces";

interface IProps {
    model: BoardModel,
    grabbedPiece: PieceModel,
    onClick: (e: { square: SquareModel, piece: PieceModel }) => void,
}

function Board ({ model, onClick, grabbedPiece }: IProps) {
    const movableSquare = model.legalMoves
        .filter(move => !grabbedPiece.isNull && move.start.equals(grabbedPiece.square))
        .map(move => move.end);

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
            const movable = movableSquare.find(ms => ms.equals(square)) !== undefined;

            return (
                <Square
                    key={i}
                    x={square.x}
                    y={square.y}
                    piece={piece}
                    movable={movable}
                    onClick={onSquareClick} />
            )
        })}
        </div>
    )
}

export default Board;