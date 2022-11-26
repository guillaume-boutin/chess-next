import { type } from "os";
import {Piece} from ".";
import style from "./Square.module.css";

interface IProps {
    x: number,
    y: number,
    piece: {
        type: string,
        color: string
    } | null
}

function Square({ x, y, piece }: IProps) {
    const _handleClick = () => {
        console.log({ x, y });
    }

    const squareColor = (x+y)%2 === 0 ? style.dark : style.light;

    const styles = `${style.square} ${squareColor}`;

    return (
        <div onClick={_handleClick} className={styles}>
            { piece ? <Piece type={piece.type} color={piece.color} /> : null }
        </div>
    )
}

export default Square;