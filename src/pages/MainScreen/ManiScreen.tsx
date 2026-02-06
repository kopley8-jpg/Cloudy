import { Button, StyleSheet, View } from "react-native"
import { EffectPreview } from "../../shared/EffectPreview/EffectPreiew"
import ColorPicker, { BrightnessSlider, HSLSaturationSlider, HueSlider, OpacitySlider, Panel1, Preview, SaturationSlider, Swatches } from "reanimated-color-picker"

export const MainScreen = () => {
    return (
        <View style={MainScreenStyle.container}>
            <EffectPreview/>
            <ColorPicker style={{ width: '70%', marginTop:20}} value='red' onCompleteJS={p => console.log(p)}>
                <Preview hideInitialColor={true}/>
                <HueSlider sliderThickness={20} style={{marginVertical:10}}/>
                <SaturationSlider sliderThickness={20} style={{marginVertical:10}}/>
                <BrightnessSlider sliderThickness={20} style={{marginVertical:10}}/>
            </ColorPicker>
        </View>
    )
}

const MainScreenStyle = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"flex-start",
        paddingTop:"20%",
        backgroundColor:"#1a1a1a"
    }
})