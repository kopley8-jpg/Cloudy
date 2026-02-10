import ColorPicker, { Preview, HueSlider, SaturationSlider, BrightnessSlider, ColorFormatsObject } from "reanimated-color-picker"
import { IColorPicker } from "./interfaces"
import useLEDStore from "../../model/ledStore"
import { StyleSheet, View } from "react-native"

export const EffectEditor = () => {
    const {leds, setLeds} = useLEDStore()
    
    const handleColorChange = (color:ColorFormatsObject) => {
        setLeds(prev => prev.map(res => ({...res, fill:color.rgba})))
    }

    return(
        <View style={styles.container}>
            <ColPicker onColorChange={color => handleColorChange(color)}/>
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

