import { create } from "zustand";
import {LedStrip, LedStore } from "./types";
import { Stop } from "../ui/EffectEditor/interfaces";


const useLEDStore = create<LedStore>((set) => ({
    ledStrip:{
        id:1,
        fill:{
            stops:[
                {id:1, color:"red", offset:0},
                {id:2, color:"blue", offset:0.5},
                {id:3, color:"green", offset:1}
            ],
            easing:'linear'
        }
    },
    setLedStrip: (newLedStrip) => {
        set(state => {
            if (typeof newLedStrip === "function") {
                return {ledStrip:newLedStrip(state.ledStrip)}
            }
            else {
                return{ledStrip:newLedStrip}
            }
        })
    }
    
}))

export default useLEDStore

