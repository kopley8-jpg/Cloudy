import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import Svg, { Rect } from "react-native-svg"
import { createAnimatedComponent, interpolateColor, useAnimatedProps, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"

import { useLEDStore } from "@entities/led-strip"
import type { AnimatedColor } from "@shared/model/gradient"

interface Led {
    id: number
    fill: AnimatedColor
}

export const EffectPreview = () => {
    const { ledStrip } = useLEDStore()

    const buildInitialLeds = () => {
        const leds: Led[] = []
        for (let i = 0; i <= 20; i += 1) {
            leds.push({ id: i, fill: ledStrip.fill })
        }
        return leds
    }

    const [leds, setLeds] = useState<Led[]>(buildInitialLeds())

    useEffect(() => {
        setLeds((prev) => prev.map((led) => ({ ...led, fill: ledStrip.fill })))
    }, [ledStrip])

    return (
        <View style={styles.container}>
            <View style={styles.ledsContainer}>
                {leds.map((led) => (
                    <LedRect key={led.id} led={led} />
                ))}
            </View>
        </View>
    )
}

const AnimatedRect = createAnimatedComponent(Rect)

const LedRect: React.FC<{ led: Led }> = ({ led }) => {
    const easingProgress = useSharedValue(0)

    const animatedProps = useAnimatedProps(() => ({
        fill: interpolateColor(
            easingProgress.value,
            led.fill.stops.map((stop) => stop.offset),
            led.fill.stops.map((stop) => stop.color)
        )
    }))

    useEffect(() => {
        easingProgress.value = withRepeat(
            withTiming(1, { duration: 2000 }),
            -1,
            true
        )
    }, [])

    return (
        <View style={styles.ledContainer}>
            <Svg viewBox="0 0 10 18">
                <AnimatedRect width={10} height="100%" animatedProps={animatedProps} rx={2} ry={2} />
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: "10%"
    },
    ledsContainer: {
        width: "100%",
        height: "60%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#242424",
        borderRadius: 20
    },
    ledContainer: {
        width: "2.6%",
        height: "100%"
    }
})
