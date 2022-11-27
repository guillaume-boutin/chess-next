import style from "./Piece.module.css";

interface IProp {
    type: string,
    color: string
};

function Piece({ type, color }: IProp) {
    return (
        <div
            className={`${style.piece} ${style[type]} ${style[color]}`}
        />
    )
}

export default Piece;