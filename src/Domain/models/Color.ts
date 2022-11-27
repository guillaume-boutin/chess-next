import { ColorName } from "../enums/ColorName";

class Color {
    public value: ColorName;

    constructor(value: ColorName) {
        this.value = value;
    }

    public static white(): Color {
        return new Color(ColorName.WHITE);
    }

    public static black(): Color {
        return new Color(ColorName.BLACK);
    }

    get opposite(): Color {
        return this.value === ColorName.WHITE
            ? Color.black() : Color.white();
    }

    equals(color: Color): boolean {
        return this.value === color.value;
    }
}

export default Color;