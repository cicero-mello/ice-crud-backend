import { Size } from "#enums"

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
