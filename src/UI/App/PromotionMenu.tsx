import { PieceType, PromotionType } from "../../Domain/enums/PieceType";
import { Color, Square as SquareModel } from "../../Domain/models";
import style from "./PromotionMenu.module.css";

interface IProps {
    square: SquareModel,
    color: Color,
    playingAs: Color,
    onPick: (e: PromotionType) => void
}

export function PromotionMenu({ square, color, playingAs, onPick }: IProps) {
    function side(): string {
        return color.equals(playingAs) ? "top" : "bottom";
    }

    function row(): string {
        return `x${square.x}`;
    }

    function onQueenClick() {
        onPick(PieceType.QUEEN)
    }

    function onKnightClick() {
        onPick(PieceType.KNIGHT)
    }

    function onBishopClick() {
        onPick(PieceType.BISHOP)
    }

    function onRookClick() {
        onPick(PieceType.ROOK)
    }

    const className = `${style.promotionMenu} ${style[side()]} ${style[row()]}`

    return (
        <div className={className}>
            <div className={`${style.piece} ${style[color.value]} ${style.queen}`} onClick={onQueenClick}></div>

            <div className={`${style.piece} ${style[color.value]} ${style.knight}`} onClick={onKnightClick}></div>

            <div className={`${style.piece} ${style[color.value]} ${style.bishop}`} onClick={onBishopClick}></div>

            <div className={`${style.piece} ${style[color.value]} ${style.rook}`} onClick={onRookClick}></div>
        </div>
    )
}