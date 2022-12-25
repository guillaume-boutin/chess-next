import { Move, Square } from "../../../Domain/models";
import { MoveHistory as Model } from "../../../Domain/models/MoveHistory";
import style from "./MoveHistory.module.css";

interface IProps {
    model: Model
}

function MoveHistory({ model }: IProps) {
    const _squareToString = (square: Square): string => {
        return `${String.fromCharCode(square.x+96)}${square.y}`;
    }

    const _moveToString = (move: Move): string => {
        return `${_squareToString(move.start)} - ${_squareToString(move.end)}`
    }

    return (
        <div className={style.base}>
            Move History

            <div className={style.moveList}>
            { model.turns.map((turn, index) => (
                <div className={style.turnRow} key={index}>
                    <div className={style.turnNumber}>{index + 1}.</div>

                    <div className={style.move}>
                        { turn[0] && `${_moveToString(turn[0])}` }
                    </div>

                    <div className={style.move}>
                        { turn[1] && `${_moveToString(turn[1])}` }
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default MoveHistory;