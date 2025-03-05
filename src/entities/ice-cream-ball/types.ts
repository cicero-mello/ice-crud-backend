import { BallFlavor, Size } from "#enums"

export interface IceCreamBallProps {
    id: string
    flavor: BallFlavor
    size: Size
}

export interface IceCreamBallConstructor {
    flavor: BallFlavor
    size: Size

    id?: string
}
