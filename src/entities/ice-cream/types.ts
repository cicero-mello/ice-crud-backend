import {
    IceCreamBall,
    IceCreamBallProps,
    IceCreamCone,
    IceCreamConeProps,
    IceCreamCup,
    IceCreamCupProps
} from "#entities"


export interface IceCreamProps {
    id: string
    name: string
    balls: IceCreamBall[]
    base: IceCreamCone | IceCreamCup
}

export interface IceCreamConstructor {
    name: string
    balls: IceCreamBall[]
    base: IceCreamCone | IceCreamCup

    id?: string
}

export interface IceCreamData {
    id: string
    name: string
    balls: IceCreamBallProps[]
    base: IceCreamConeProps | IceCreamCupProps
}
