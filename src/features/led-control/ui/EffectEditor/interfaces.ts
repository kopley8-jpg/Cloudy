import { ColorFormatsObject } from "reanimated-color-picker";

export interface IColorPicker {
    color:string,
    onColorChange:((color:ColorFormatsObject) => void),
    onColorChangeComplete:() => void
}

export interface AnimatedColor {
    stops:Stop[],
    easing:"linear"
}

export interface Stop {
    id:number,
    color:string,
    offset:number
}

//((e.nativeEvent.pageX-((windowWidth-thumbsContainerWidth)/2))/(thumbsContainerWidth/100)/100)