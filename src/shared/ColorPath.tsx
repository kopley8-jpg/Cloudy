import React, { useState } from "react"
import { LayoutRectangle, StyleSheet, View } from "react-native"

import { AnimatedColor } from "../features/led-control/ui/EffectEditor/interfaces"
import LinearGradient from "react-native-linear-gradient"

interface IColorPath {
    animatedColor:AnimatedColor,
    onThumbTouchIn:(id:number) => void,
    onThumbsContainerTouchMove: (offset:number) => void
}

export const ColorPath:React.FC<IColorPath> = ({animatedColor, onThumbTouchIn, onThumbsContainerTouchMove}) => {

    const [widthThumbsContainer, setWidthThumbsContainer] = useState<number>(100)

    

    const handleThumbsContainerTouchMove = (x:number) => {
        console.log(x/(widthThumbsContainer/100)/100)
    }

    return(
        <View style={styles.container}>
            <View style={styles.thumbsContainer}
            onTouchStart={p => handleThumbsContainerTouchMove(p.nativeEvent.locationX)} 
            onLayout={p => setWidthThumbsContainer(p.nativeEvent.layout.width)}>
                {animatedColor.stops.map(stop => (
                    <View 
                    key={stop.id} 
                    style={{width:"4%", height:"80%", backgroundColor:stop.color, position:"absolute", left:`${stop.offset*100-2}%`}} 
                    onTouchStart={() => onThumbTouchIn(stop.id)}
                    />
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