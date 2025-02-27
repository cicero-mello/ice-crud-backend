import { Size } from "#enums"

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

export enum BallFlavor {
    chocolate = 0,
    vanilla = 1
}
