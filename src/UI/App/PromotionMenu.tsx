import { PieceType, PromotionType } from "../../Domain/enums/PieceType";
import { Color, Square as SquareModel } from "../../Domain/models";
import style from "./PromotionMenu.module.css";

interface IProps {
    square: SquareModel,
    color: Color,
    viewAs: Color,
    onPick: (e: PromotionType) => void
}

export function PromotionMenu({ square, color, viewAs, onPick }: IProps) {
    function side(): string {
        return color.equals(viewAs) ? "top" : "bottom";
    }

    function row(): string {
        var _x = viewAs.equals(Color.white()) ?
            square.x : 9 - square.x;
        return `x${_x}`;
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