import { ColorValue } from "react-native"

export type led = {id:number, fill:ColorValue}

interface LEDStoreState {
    leds: led[]
}

interface LEDStoreActions {
    setLeds:(newleds:led[]|((prev:led[]) => led[])) => void
}

export type LedStore = LEDStoreState & LEDStoreActions