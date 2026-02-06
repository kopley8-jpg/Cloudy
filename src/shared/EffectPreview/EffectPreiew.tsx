import React, { useState } from "react"
import { ColorValue, StyleSheet, useAnimatedValue, View } from "react-native"
import Animated, { createAnimatedComponent, interpolateColor, useAnimatedProps, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import Svg, { Circle, Rect } from "react-native-svg"
import { ILed } from "./interfaces"



export const EffectPreview = () => {

    const [leds, setLeds] = useState<ILed[]>([
    ])

    const handleLayout = () => {
        for (let i = 0; i<=20; i++){
            setLeds(prev => [...prev, {id:i, color:"white"}])
        }
    }
 
    return(
        <View style={EffectPreviewStyles.container} >
            <View style={EffectPreviewStyles.LedsContainer} onLayout={handleLayout}>
                {leds.map((x) => (
                    <Led key={x.id}/>
                ))}
            </View>
        </View>
    )
}

const Led:React.FC = () => {

    return(
        <View style={EffectPreviewStyles.LedContainer}>
            <Svg viewBox="0 0 10 16">
                <Rect width={10} height={"100%"} fill={"green"} rx={2} ry={2}/>
            </Svg>
        </View>
    )
}

const EffectPreviewStyles = StyleSheet.create({
    container:{
        width:"80%",
        height:"10%",
        backgroundColor:"#242424"
    },
    LedsContainer:{
        width:"100%",
        height:"60%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly",
        backgroundColor:"red"
    },
    LedContainer:{
        width:"3.5%",
        height:"100%",
    }
})