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
        const stops = effectEditor.animatedColor.stops
        const sortedStops = [...stops].sort((a, b) => a.offset - b.offset)
        const pickedStopID = effectEditor.pickedStopID
        setEffectEditor(prev => ({...prev, animatedColor:{...prev.animatedColor, stops:sortedStops.map(stop => stop.id === pickedStopID?{...stop, offset:offset}:stop)}}))
    }

    const handleColorChange = (color:ColorFormatsObject) => (
        setEffectEditor(prev => ({...prev, animatedColor:{...prev.animatedColor, stops:prev.animatedColor.stops.map(stop => stop.id === prev.pickedStopID? {...stop, color:color.hex}:stop)}}))
    )

    return(
        <View 
            style={styles.container}>
            <ColorPath 
                onThumbsContainerTouchMove={handleThumbsContainerMove} 
                onThumbTouchIn={handleThumbTouchIn} 
                animatedColor={effectEditor.animatedColor} 
                pickedStopId={effectEditor.pickedStopID}/>
            {effectEditor.pickedStopID?
                <ColPicker 
                    color={effectEditor.animatedColor.stops.find(stop => stop.id === effectEditor.pickedStopID)!.color} 
                    onColorChange={handleColorChange}/>:
                <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"90%",
        height:"40%",
        alignItems:"center",
        justifyContent:"center",
        borderColor:"grey",
        borderWidth:2
    }
})

const ColPicker:React.FC<IColorPicker> = ({color, onColorChange}) => {
    return(
        <ColorPicker style={{ width: '70%', marginTop:20}} value={color} onChangeJS={color => onColorChange(color)}>
            <Preview hideInitialColor={true}/>
            <HueSlider sliderThickness={20} style={{marginVertical:10}}/>
            <SaturationSlider sliderThickness={20} style={{marginVertical:10}}/>
            <BrightnessSlider sliderThickness={20} style={{marginVertical:10}}/>
        </ColorPicker>            
    )
}

