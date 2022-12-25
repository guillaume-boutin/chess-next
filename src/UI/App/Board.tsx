"use client";

import style from "./Board.module.css";
import { PromotionMenu } from ".";
import { Board as BoardModel, Color, Square as SquareModel } from "../../Domain/models";
import { Piece as PieceModel } from "../../Domain/models/Pieces";
import { PromotionType } from "../../Domain/enums/PieceType";
import Square from "./Square/Square";

interface IProps {
    model: BoardModel,
    viewAs: Color,
    grabbedPiece: PieceModel,
    promotingSquare: SquareModel,
    onPromotionPiecePick: (e: PromotionType) => void,
    onClick: (e: { square: SquareModel, piece: PieceModel }) => void,
}

function Board ({ model, viewAs, onClick, grabbedPiece, promotingSquare, onPromotionPiecePick }: IProps) {
    const movableSquare = model.legalMoves
        .filter(move => !grabbedPiece.isNull && move.start.equals(grabbedPiece.square))
        .map(move => move.end);

    function makeSquares(): SquareModel[] {
        let squares: SquareModel[] = [];

        for (let y = 8; y > 0; y--) {
            for (let x = 1; x < 9; x ++) {
                let _x = x, _y = y;
                if (viewAs.equals(Color.black())) {
                    _x = 9 - x; _y = 9 - y;
                }

                squares = [...squares, new SquareModel(_x, _y)]
            }
        }

        return squares;
    }

    function onSquareClick(e: { square: SquareModel, piece: PieceModel }) {
        console.log(e.square);
        onClick(e);
    }

    const squares = makeSquares();

    return (
        <div className={style.container}>
            <div className={style.board}>
            { squares.map((square, i) => {
                const piece = model.position.getPiece(square);
                const movable = movableSquare.find(ms => ms.equals(square)) !== undefined;

                const markAsLastMove =
                    square.equals(model.position.lastMove.start)
                    || square.equals(model.position.lastMove.end)

                return (
                    <Square
                        key={i}
                        x={square.x}
                        y={square.y}
                        piece={piece}
                        movable={movable}
                        onClick={onSquareClick}
                        // isGrabbed={square.equals(grabbedPiece.square)}
                        isGrabbed={false}
                        markAsLastMove={markAsLastMove} />
                )
            })}
            </div>
            { !promotingSquare.equals(SquareModel.null()) ?
                <div className={style.overlay}>
                    <PromotionMenu
                        square={promotingSquare}
                        color={model.toPlay}
                        viewAs={viewAs}
                        onPick={onPromotionPiecePick} />
                </div> :
                null
            }
        </div>
    )
}

export default Board;