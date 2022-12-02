import { Piece } from ".";
import style from "./Square.module.css";
import { Piece as PieceModel } from "../../Domain/models/Pieces"
import { Square as SquareModel } from "../../Domain/models";

interface IProps {
    x: number,
    y: number,
    piece: PieceModel,
    onClick: (e: { square: SquareModel, piece: PieceModel }) => void
}

function Square({ x, y, piece, onClick }: IProps) {
    const squareColor = (x+y)%2 === 0 ? style.dark : style.light;

    const styles = `${style.square} ${squareColor}`;

    function _handleClick() {
        onClick({ square: new SquareModel(x, y), piece })
    }

    return (
        <div onClick={_handleClick} className={styles}>
        { piece.isNull
            ? null
            : <Piece type={piece.type} color={piece.color.value} />
        }
        </div>
    )
}

export default Square;