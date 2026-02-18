import { ColorValue } from "react-native"
import { AnimatedColor } from "../ui/EffectEditor/interfaces"

export type led = {id:number, fill:AnimatedColor}

interface LEDStoreState {
    leds: led[]
}

interface LEDStoreActions {
    setLeds:(newleds:led[]|((prev:led[]) => led[])) => void
}

export type LedStore = LEDStoreState & LEDStoreActions