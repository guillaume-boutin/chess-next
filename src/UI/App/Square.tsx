import { type } from "os";
import { Piece } from ".";
import style from "./Square.module.css";
import { Piece as PieceModel } from "../../Domain/models/Pieces"

interface IProps {
    x: number,
    y: number,
    piece: PieceModel | null,
    onClick: (e: { x: number, y: number, piece: PieceModel | null}) => void
}

function Square({ x, y, piece, onClick }: IProps) {
    const _handleClick = () => {
        onClick({ x, y, piece })
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