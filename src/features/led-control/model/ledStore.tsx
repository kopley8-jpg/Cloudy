import { create } from "zustand";
import {LedStore } from "./types";


const useLEDStore = create<LedStore>((set) => ({
    leds:[],
    setLeds: (newLeds) => {
        set(state => {
            if (typeof newLeds === "function") {
                return {leds:newLeds(state.leds)}
            }
            else {
                return{leds:newLeds}
            }
        })
    }
    
}))

export default useLEDStore