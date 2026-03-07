import React, { useEffect, useState } from "react"
import { GestureResponderEvent, LayoutChangeEvent, LayoutRectangle, StyleSheet, Text, useWindowDimensions, View } from "react-native"

import { AnimatedColor, Stop } from "../../features/led-control/ui/EffectEditor/interfaces"
import LinearGradient from "react-native-linear-gradient"

interface IColorPath {
    stops:Stop[],
    pickedStopId:number|null,
    onThumbTouchStart: ((id:number) => void),
    onThumbsContainerMove:((offset:number) => void),
    onThumbsContainerMoveComplete?:() => void
}

export const ColorPath:React.FC<IColorPath> = ({stops, pickedStopId, onThumbTouchStart, onThumbsContainerMove, onThumbsContainerMoveComplete}) => {

    const [thumbsContainerWidth, setThumbsContainerWidth] = useState(100)
    const windowWidth = useWindowDimensions().width
    
    const handleLayout = (e:LayoutChangeEvent) => {
        setThumbsContainerWidth(e.nativeEvent.layout.width)
    }

    const handleTouchStart = (id:number) => {
        onThumbTouchStart(id)
    }

    const handleThumbsContainerTouchMove = (e:GestureResponderEvent) => {
        const offset = pagexToOffset(e.nativeEvent.pageX, windowWidth, thumbsContainerWidth)
        onThumbsContainerMove(offset)
    }

    const handleThumbsContainerTouchEnd = () => {
        onThumbsContainerMoveComplete?.()
    }

    return(
        <View 
        style={styles.container}>
            <View 
            style={styles.thumbsContainer}
            onLayout={handleLayout}
            onTouchMove={handleThumbsContainerTouchMove}
            onTouchEnd={handleThumbsContainerTouchEnd}>
                {stops.map((stop, index) => (
                    <Thumb 
                    key={stop.id}
                    stop={stop}
                    isPicked={stop.id === pickedStopId}
                    index={index}
                    onTouchStart={handleTouchStart}/>
                ))}
            </View>
            <ColorPathPreview 
            stops={stops}/>
        </View>
    )
}

interface IThumb {
    stop:Stop,
    isPicked:boolean,
    index:number,
    onTouchStart: (id:number) => void
}

const Thumb:React.FC<IThumb> = ({stop, isPicked, index, onTouchStart}) => {
    return(
        <View 
        onTouchStart={() => onTouchStart(stop.id)} 
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

const pagexToOffset = (pageX:number, windowWidth:number, thumbsContainerWidth:number) => {
    const locationX = pageX-((windowWidth-thumbsContainerWidth)/2)
    const locationXToPercentage = locationX/(thumbsContainerWidth/100)
    return Math.min(1, Math.max(0, locationXToPercentage/100))
}

export const ColorPathWithLocalStates:React.FC<{stops:Stop[]}> = ({stops}) => {
    
    const [editingStops, setEditingStops] = useState<Stop[]>([...stops])
    const [pickedStopId, setPickedStopID] = useState<number|null>(null)
    const [containerWidth, setContainerWidth] = useState<number>(0)
    const windowWidth = useWindowDimensions().width

    const changeOffsetForPickedStop = (offset:number) => {
        if(pickedStopId === null) return 
        const sortedStops = [...editingStops].sort((a, b) => a.offset - b.offset)
        const newStops = [...sortedStops].map(stop => 
            stop.id === pickedStopId
            ?{...stop, offset:offset}
            :stop
        )
        console.log(offset)
        setEditingStops(newStops)
    }

    const changePickedStopId = (id:number) => {
        setPickedStopID(prev => 
            prev === id
            ? null
            : id
        )
    }

    const handleLayout = (e:LayoutChangeEvent) => {
        setContainerWidth(e.nativeEvent.layout.width)
    }    

    const handleThumbsContainerTouchMove = (e:GestureResponderEvent) => {
        const offset = pagexToOffset(e.nativeEvent.pageX,windowWidth, containerWidth)
        changeOffsetForPickedStop(offset)
    }

    const handleThumbTouchStart = (id:number) => {
        changePickedStopId(id)
    }

    return(
        <View 
        style={styles.container}>
            <View 
            style={styles.thumbsContainer}
            onLayout={handleLayout}
            onTouchMove={handleThumbsContainerTouchMove}
            onTouchEnd={() => {}}>
                {editingStops.map((stop, index) => (
                    <Thumb 
                    key={stop.id}
                    stop={stop}
                    isPicked={stop.id === pickedStopId}
                    index={index}
                    onTouchStart={handleThumbTouchStart}/>
                ))}
            </View>
            <ColorPathPreview 
            stops={editingStops}/>
        </View>
    )
}