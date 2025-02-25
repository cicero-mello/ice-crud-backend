import { IceCreamBall } from "#classes/ice-cream-ball"
import { IceCreamCone } from "#classes/ice-cream-cone"
import { IceCreamCup } from "#classes/ice-cream-cup"

export interface IceCreamProps {
    id: string
    name: string
    balls: IceCreamBall[]
    base: IceCreamCone | IceCreamCup
}

export type IceCreamConstructor = Omit<
    IceCreamProps,
    "id"
>
