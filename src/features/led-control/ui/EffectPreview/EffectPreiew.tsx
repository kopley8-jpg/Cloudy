import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import Svg, { Circle, Rect } from "react-native-svg"
import useLEDStore from "../../model/ledStore"
import { createAnimatedComponent, interpolateColor, ReduceMotion, useAnimatedProps, useSharedValue, withRepeat, withSpring, withTiming } from "react-native-reanimated"
import { AnimatedColor } from "../EffectEditor/interfaces"

interface Led {
    id:number,
    fill:AnimatedColor
}

export const EffectPreview = () => {

    const {ledStrip, setLedStrip} = useLEDStore()

    const newLeds = () => {
        let newLeds:Led[] = []
        for(let i = 0; i<=20; i++){
            newLeds = [...newLeds, {id:i, fill:ledStrip.fill}]
        }
        return newLeds
    }

    const [leds, setLeds] = useState(newLeds())

    useEffect(() => {
        setLeds(prev => prev.map(led => ({...led, fill:ledStrip.fill})))
    }, [ledStrip])



    return(
        <View style={EffectPreviewStyles.container}>
            <View style={EffectPreviewStyles.LedsContainer}>
                {leds.map(led => (
                    <Led key={led.id} led={led}/>
                ))}
            </View>
        </View>
    )
}

const AnimatedRect = createAnimatedComponent(Rect)

const Led:React.FC<{led:Led}> = ({led}) => {
    const easingProgress = useSharedValue(0)

    const animatedProps = useAnimatedProps(() => ({
        fill:interpolateColor(
            easingProgress.value, 
            led.fill.stops.map(stop => stop.offset), 
            led.fill.stops.map(stop => stop.color)
        )
    }))

    useEffect(() => {
        easingProgress.value = withRepeat(
            withTiming(1, {duration:2000}),
            -1,
            true,
            () => {}
        )     
    }, [])

    return(
        <View style={EffectPreviewStyles.LedContainer}>
            <Svg viewBox="0 0 10 18">
                <AnimatedRect width={10} height={"100%"} animatedProps={animatedProps} rx={2} ry={2}/>
            </Svg>
        </View>
    )
}

const EffectPreviewStyles = StyleSheet.create({
    container:{
        width:"90%",
        height:"10%",
    },
    LedsContainer:{
        width:"100%",
        height:"60%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly",
        backgroundColor:"#242424",
        borderRadius:20
    },
    LedContainer:{
        width:"3%",
        height:"100%",
    }
})