export type GradientStopType = {
    id: number
    color: string
    offset: number
}

export type AnimatedGradient = {
    stops: GradientStopType[]
    easing: "linear"
}
