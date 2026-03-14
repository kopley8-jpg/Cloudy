import { ColorFormatsObject } from "reanimated-color-picker"
import type { AnimatedColor, Stop } from "../../../../shared/model/gradient"

export interface IColorPicker {
    color: string
    onColorChange: (color: ColorFormatsObject) => void
    onColorChangeComplete: () => void
}

export type { AnimatedColor, Stop }
