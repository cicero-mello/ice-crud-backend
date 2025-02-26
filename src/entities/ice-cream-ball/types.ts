import { Size } from "#types"

export interface IceCreamBallProps {
    id: string
    flavor: BallFlavor
    size: Size
}

export type IceCreamBallConstructor = Omit<
    IceCreamBallProps,
    "id"
>

export enum BallFlavor {
    chocolate = 0,
    vanilla = 1
}
