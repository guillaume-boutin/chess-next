import { PieceType } from "../../../Domain/enums/PieceType";
import style from "./MoveMarker.module.css";

interface IProps {
    piece: PieceType
}

function MoveMarker({ piece }: IProps) {
    return (
        <div className={style.moveMarker}>
            <div className={ piece === PieceType.NULL ? style.empty : style.piece } />
        </div>
    )
}

export default MoveMarker;