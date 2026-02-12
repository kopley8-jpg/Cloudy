import ColorPicker, { Preview, HueSlider, SaturationSlider, BrightnessSlider, ColorFormatsObject } from "reanimated-color-picker"
import { AnimatedColor, IColorPicker } from "./interfaces"
import { StyleSheet, View } from "react-native"
import { useState } from "react"
import { ColorPath } from "../../../../shared/ColorPath"

interface IEffectEditor {
    animatedColor:{
        stops:{
            id:number,
            color:string,
            offset:number
        }[],
        easing:"linear"
    },
    pickedStopID:number|null
}

export const EffectEditor = () => {
    const [effect, setEffect] = useState()

    const [effectEditor, setEffectEditor] = useState<IEffectEditor>({
        animatedColor:{
            stops:[
                {id:1, color:"red", offset:0},
                {id:2, color:"green", offset:0.5},
                {id:3, color:"blue", offset:1}
            ],
            easing:"linear"            
        },
        pickedStopID:null
    })

    const handleThumbTouchIn = (id:number) => {
        setEffectEditor(prev => ({...prev, pickedStopID:prev.pickedStopID===id?null:id}))
    }

    const handleThumbsContainerMove = (offset:number) => {
        setEffectEditor(prev => ({
            ...prev, 
            animatedColor:{
                ...prev.animatedColor, 
                stops:prev.animatedColor.stops.map(stop => 
                    stop.id === prev.pickedStopID? 
                    {...stop, offset:offset}:stop)
                }
            }))
    }

    return(
        <View style={styles.container}>
            <ColorPath onThumbsContainerTouchMove={p => handleThumbsContainerMove(p)} onThumbTouchIn={p => handleThumbTouchIn(p)} animatedColor={effectEditor.animatedColor}/>
            <ColPicker onColorChange={color => {}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"90%",
        height:"40%",
        alignItems:"center",
        paddingTop:"10%",
        borderColor:"grey",
        borderWidth:2
    }
})

const ColPicker:React.FC<IColorPicker> = ({onColorChange}) => {
    return(
        <ColorPicker style={{ width: '70%', marginTop:20}} value='red' onCompleteJS={color => onColorChange(color)}>
            <Preview hideInitialColor={true}/>
            <HueSlider sliderThickness={20} style={{marginVertical:10}}/>
            <SaturationSlider sliderThickness={20} style={{marginVertical:10}}/>
            <BrightnessSlider sliderThickness={20} style={{marginVertical:10}}/>
        </ColorPicker>            
    )
}

