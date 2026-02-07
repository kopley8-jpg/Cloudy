import { Button, StyleSheet, View } from "react-native"
import { EffectPreview } from "../../shared/EffectPreview/EffectPreiew"
import ColorPicker, { BrightnessSlider, HSLSaturationSlider, HueSlider, OpacitySlider, Panel1, Preview, SaturationSlider, Swatches } from "reanimated-color-picker"
import { EffectEditor } from "../../shared/EffectEditor/EffectEditor"

export const MainScreen = () => {
    return (
        <View style={MainScreenStyle.container}>
            <EffectPreview/>
            <EffectEditor/>
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