import { IceCreamBall } from "#entities/ice-cream-ball"
import { IceCreamCone } from "#entities/ice-cream-cone"
import { IceCreamCup } from "#entities/ice-cream-cup"

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
