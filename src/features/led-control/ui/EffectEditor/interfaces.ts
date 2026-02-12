import { ColorFormatsObject } from "reanimated-color-picker";

export interface IColorPicker {onColorChange:((color:ColorFormatsObject) => void)}

export interface AnimatedColor {
    stops:{
        id:number,
        color:string,
        offset:number
    }[],
    easing:"linear"
}