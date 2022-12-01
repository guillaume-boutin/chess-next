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

    public static null(): Color {
        return new Color(ColorName.NULL);
    }

    get isNull(): boolean {
        return this.value === ColorName.NULL;
    }

    get opposite(): Color {
        if (this.isNull) return this;

        return this.value === ColorName.WHITE
            ? Color.black() : Color.white();
    }

    equals(color: Color): boolean {
        return this.value === color.value;
    }
}

export default Color;