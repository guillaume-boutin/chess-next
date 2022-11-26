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

    const pieceType = piece?.type ? style[piece.type] : "";

    const pieceColor = piece?.color ? style[piece.color] : "";

    const styles = `${style.square} ${squareColor} ${pieceType} ${pieceColor}`.trim();

    return (
        <div onClick={_handleClick} className={styles}></div>
    )
}

export default Square;