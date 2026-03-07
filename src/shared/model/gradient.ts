export type GradientStop = {
    id: number
    color: string
    offset: number
}

export type AnimatedGradient = {
    stops: GradientStop[]
    easing: "linear"
}

export type Stop = GradientStop
export type AnimatedColor = AnimatedGradient
