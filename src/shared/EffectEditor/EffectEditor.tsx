import ColorPicker, { Preview, HueSlider, SaturationSlider, BrightnessSlider } from "reanimated-color-picker"

export const EffectEditor = () => {
    return(
        <ColPicker/>
    )
}

const ColPicker = () => {
    return(
        <ColorPicker style={{ width: '70%', marginTop:20}} value='red' onCompleteJS={p => console.log(p)}>
            <Preview hideInitialColor={true}/>
            <HueSlider sliderThickness={20} style={{marginVertical:10}}/>
            <SaturationSlider sliderThickness={20} style={{marginVertical:10}}/>
            <BrightnessSlider sliderThickness={20} style={{marginVertical:10}}/>
        </ColorPicker>            
    )
}