interface IProps {
    x: number,
    y: number
}

function Square({ x, y }: IProps) {
    const _handleClick = () => {
        console.log({ x, y });
    }

    return (
        <div onClick={_handleClick}></div>
    )
}

export default Square;