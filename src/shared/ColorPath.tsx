import React, { useState } from "react"
import { GestureResponderEvent, LayoutChangeEvent, LayoutRectangle, StyleSheet, useWindowDimensions, View } from "react-native"

import { AnimatedColor } from "../features/led-control/ui/EffectEditor/interfaces"
import LinearGradient from "react-native-linear-gradient"

interface IColorPath {
    animatedColor:AnimatedColor,
    onThumbTouchIn:(id:number) => void,
    onThumbsContainerTouchMove: (offset:number) => void
}

export const ColorPath:React.FC<IColorPath> = ({animatedColor, onThumbTouchIn, onThumbsContainerTouchMove}) => {

    const [thumbsContainerWidth, setThumbsContainerWidth] = useState(100)
    const windowWidth = useWindowDimensions().width

    const handleLayout = (e:LayoutChangeEvent) => {
        setThumbsContainerWidth(e.nativeEvent.layout.width)
    }

    const handleThumbsContainerTouchMove = (e:GestureResponderEvent) => {
        const offset = ((e.nativeEvent.pageX-((windowWidth-thumbsContainerWidth)/2))/(thumbsContainerWidth/100)/100)
        console.log(e.nativeEvent.pageX)
        if(!(e.nativeEvent.pageX<((windowWidth-thumbsContainerWidth)/2)||e.nativeEvent.pageX>(windowWidth-((windowWidth-thumbsContainerWidth)/2)))){
            onThumbsContainerTouchMove(offset)
        }
    }

    return(
        <View style={styles.container}>
            <View 
            style={styles.thumbsContainer}
            onLayout={handleLayout}
            onTouchMove={handleThumbsContainerTouchMove}>
                {animatedColor.stops.map(stop => (
                    <View 
                    key={stop.id}
                    onTouchStart={() => onThumbTouchIn(stop.id)} 
                    style={{width:"6%", height:"90%", backgroundColor:stop.color, position:'absolute', left:`${stop.offset*100-3}%`}}/>
                ))}
            </View>
            <LinearGradient 
            start={{x:0, y:0}} 
            end={{x:1, y:0}} 
            colors={animatedColor.stops.map(res => res.color)} 
            locations={animatedColor.stops.map(res => res.offset)} 
            style={styles.colorPathContainer}>
            </LinearGradient>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        width:"95%",
        height:"20%",
        alignItems:"center",
        backgroundColor:"white",
        borderWidth:2
    },
    thumbsContainer:{
        width:"100%",
        height:"45%",
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"yellow",
    },
    colorPathContainer:{
        width:"100%",
        height:"55%"
    }
})