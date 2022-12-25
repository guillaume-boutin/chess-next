import { MoveHistory as MoveHistoryModel } from "../../../Domain/models/MoveHistory";
import Clock from "./Clock";
import MoveHistory from "./MoveHistory";
import style from "./SidePanel.module.css";

interface IProps {
    moveHistory: MoveHistoryModel
}

function SidePanel({ moveHistory }: IProps) {
    return (
        <div className={style.base}>
            <Clock />

            <MoveHistory model={moveHistory} />
        </div>
    )
}

export default SidePanel;