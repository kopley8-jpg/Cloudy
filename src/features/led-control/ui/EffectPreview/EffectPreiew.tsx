import React from "react"
import { StyleSheet, View } from "react-native"
import Svg, { Circle, Rect } from "react-native-svg"
import useLEDStore from "../../model/ledStore"
import { led } from "../../model/types"



export const EffectPreview = () => {

    const {leds, setLeds} = useLEDStore()
    
    const handleLayout = () => {
        for(let i = 0; i<20; i++){
            setLeds(prev => [...prev, {id:i, fill:"red"}])
        }
    }

    return(
        <View style={EffectPreviewStyles.container} onLayout={handleLayout}>
            <View style={EffectPreviewStyles.LedsContainer}>
                {leds.map(led => (
                    <Led key={led.id} led={led}/>
                ))}
            </View>
        </View>
    )
}

const Led:React.FC<{led:led}> = ({led}) => {

    return(
        <View style={EffectPreviewStyles.LedContainer}>
            <Svg viewBox="0 0 10 18">
                <Rect width={10} height={"100%"} fill={led.fill} rx={2} ry={2}/>
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