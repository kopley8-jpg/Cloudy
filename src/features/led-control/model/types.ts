import { ColorValue } from "react-native"
import { AnimatedColor } from "../ui/EffectEditor/interfaces"

export type LedStrip = {id:number, fill:AnimatedColor}

interface LEDStoreState {
    ledStrip: LedStrip
}

interface LEDStoreActions {
    setLedStrip:(newLedStrip:LedStrip|((prev:LedStrip) => LedStrip)) => void
}

export type LedStore = LEDStoreState & LEDStoreActions