import { nanoid } from "nanoid"
import { Size } from "../types"

export type BallFlavor = (
    "chocolate" | "vanilla"
)

export interface IceCreamBallProps {
    id: string
    flavor: BallFlavor
    size: Size
}

export type IceCreamBallConstructor = Omit<
    IceCreamBallProps,
    "id"
>

export class IceCreamBall {
    private readonly props: IceCreamBallProps

    get id () {
        return this.props.id
    }

    get flavor () {
        return this.props.flavor
    }

    get size () {
        return this.props.size
    }

    updateBall (update: Partial<IceCreamBallConstructor>) {
        this.props.size = update.size ?? this.props.size
        this.props.flavor = update.flavor ?? this.props.flavor
    }

    constructor (props: IceCreamBallConstructor) {
        this.props = {
            flavor: props.flavor,
            size: props.size,
            id: nanoid()
        }
    }
}
