import { create } from "zustand";
import {led, LedStore } from "./types";

const firstLeds = () => {
    let newLeds:led[] = []
    for(let i = 0; i<=20; i++){
        newLeds = [
            ...newLeds,
            {
                id:i,
                fill:{
                    stops:[
                        {id:1, color:"red", offset:0},
                        {id:2, color:"green", offset:0.5},
                        {id:3, color:"blue", offset:1}
                    ],
                    easing:"linear"             
                }
            }
        ]
    }
    return(newLeds)
}

const useLEDStore = create<LedStore>((set) => ({
    leds:firstLeds(),
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

