import React, { useState } from "react"
import { GestureResponderEvent, LayoutChangeEvent, LayoutRectangle, StyleSheet, Text, useWindowDimensions, View } from "react-native"

import { AnimatedColor, Stop } from "../features/led-control/ui/EffectEditor/interfaces"
import LinearGradient from "react-native-linear-gradient"

interface IColorPath {
    animatedColor:AnimatedColor,
    pickedStopId:number|null,
    onThumbTouchIn:(id:number) => void,
    onThumbsContainerTouchMove: (offset:number) => void
}

export const ColorPath:React.FC<IColorPath> = ({animatedColor, pickedStopId, onThumbTouchIn, onThumbsContainerTouchMove}) => {

    const [thumbsContainerWidth, setThumbsContainerWidth] = useState(100)
    const windowWidth = useWindowDimensions().width
    
    
    const handleLayout = (e:LayoutChangeEvent) => {
        setThumbsContainerWidth(e.nativeEvent.layout.width)
    }

    const handleThumbsContainerTouchMove = (e:GestureResponderEvent) => {
        const pageX = e.nativeEvent.pageX
        const locationX = pageX-((windowWidth-thumbsContainerWidth)/2)
        const locationXToPercentage = locationX/(thumbsContainerWidth/100)
        const offset = locationXToPercentage/100
        const isPageXOverThumbsContainer = (pageX<((windowWidth-thumbsContainerWidth)/2)||pageX>(windowWidth-((windowWidth-thumbsContainerWidth)/2)))
        if(!isPageXOverThumbsContainer){
            onThumbsContainerTouchMove(offset)
        }
    }

    return(
        <View 
        style={styles.container}>
            <View 
            style={styles.thumbsContainer}
            onLayout={handleLayout}
            onTouchMove={handleThumbsContainerTouchMove}>
                {animatedColor.stops.map((stop, index) => (
                    <Thumb 
                    key={stop.id}
                    stop={stop}
                    isPicked={stop.id === pickedStopId}
                    index={index}
                    onTouchIn={onThumbTouchIn}/>
                ))}
            </View>
            <ColorPathPreview 
            stops={animatedColor.stops}/>
        </View>
    )
}

interface IThumb {
    stop:Stop,
    isPicked:boolean,
    index:number,
    onTouchIn: (id:number) => void
}

const Thumb:React.FC<IThumb> = ({stop, isPicked, index, onTouchIn}) => {
    return(
        <View 
        onTouchStart={() => onTouchIn(stop.id)} 
        style={{width:"6%", height:"90%",borderWidth:3, borderColor:isPicked?"white":"grey" ,backgroundColor:stop.color, position:'absolute', left:`${stop.offset*100-3}%`}}>
                <Text>{index}</Text>
        </View>
    )
}

interface IColorPathPreview {
    stops:Stop[]
}

const ColorPathPreview:React.FC<IColorPathPreview> = ({stops}) => {
    return(
        <LinearGradient 
        start={{x:0, y:0}} 
        end={{x:1, y:0}} 
        colors={stops.map(res => res.color)} 
        locations={stops.map(res => res.offset)} 
        style={styles.colorPathContainer}>
        </LinearGradient>
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