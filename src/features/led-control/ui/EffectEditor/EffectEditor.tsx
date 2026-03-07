import ColorPicker, { Preview, HueSlider, SaturationSlider, BrightnessSlider, ColorFormatsObject } from "reanimated-color-picker"
import { AnimatedColor, IColorPicker, Stop } from "./interfaces"
import { StyleSheet, View } from "react-native"
import { useState } from "react"
import { ColorPathWithLocalStates } from '@features/led-control/components/ColorPath/ui';
import { useLEDStore } from "../../../../entities/led-strip"

//TODO: убрать нахуй, типы выносяться нахуй
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

    const {ledStrip, setLedStrip} = useLEDStore()
    const [editingStops, setEditingStops] = useState<Stop[]>(ledStrip.fill.stops)
    const [pickedStopId, setPickedStopID] = useState<number|null>(1)

    const changeOffsetForPickedStop = (offset:number) => {
        if(pickedStopId === null) return
        const sortedStops = [...editingStops].sort((a, b) => a.offset - b.offset)
        const newStops = [...editingStops].map(stop =>
            stop.id === pickedStopId
            ?{...stop, offset:offset}
            :stop
        )
        setEditingStops(newStops)
    }

    const changePickedStopId = (id:number) => {
        setPickedStopID(prev =>
            prev === id
            ? null
            : id
        )
    }

    const handleColPickerColorChange = (color:ColorFormatsObject) => {
        setEditingStops(prev =>
            prev.map(stop =>
                stop.id === pickedStopId
                ? ({...stop, color:color.hex})
                : stop
            )
        )
    }

    const handleColPickerColorChangeComplete = () => {
        setLedStrip(prev => ({
            ...prev,
            fill: {
                ...prev.fill,
                stops:editingStops
            }
        }))
    }

    return(
        <View
            style={styles.container}
        >
            {/* <ColorPathComponent
                stops={editingStops}
                pickedStopId={pickedStopId}
                onThumbTouchStart={changePickedStopId}
                onThumbsContainerMove={changeOffsetForPickedStop}
            /> */}
                {/* {editingStops.map((stop, index) =>(
                    <Text key={stop.id} style={{color:"white"}}>
                        {`
                        id:${stop.id},
                        index:${index},
                        color:${stop.color},
                        offset:${stop.offset},
                        picked:${pickedStopID===stop.id?"true":"false"}`
                        }</Text>)
                )} */}
                <ColorPathWithLocalStates stops={editingStops}/>
            {pickedStopId
                ?<ColPicker
                    color={editingStops.find(stop => stop.id === pickedStopId)!.color}
                    onColorChange={handleColPickerColorChange}
                    onColorChangeComplete={handleColPickerColorChangeComplete}
                    />
                :<></>
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

const ColPicker:React.FC<IColorPicker> = ({color, onColorChange, onColorChangeComplete}) => {
    return(
        <ColorPicker
        style={{ width: '70%', marginTop:20}}
        value={color}
        onChangeJS={color => onColorChange(color)}
        onCompleteJS={onColorChangeComplete}>
            <Preview hideInitialColor={true}/>
            <HueSlider sliderThickness={20} style={{marginVertical:10}}/>
            <SaturationSlider sliderThickness={20} style={{marginVertical:10}}/>
            <BrightnessSlider sliderThickness={20} style={{marginVertical:10}}/>
        </ColorPicker>
    )
}

