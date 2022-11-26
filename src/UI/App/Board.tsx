import style from "./Board.module.css";
import {Square} from ".";

function Board () {
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
            { makeSquares().map((square, i) => <Square key={i} x={square.x} y={square.y} />) }
        </div>
    )
}

export default Board;