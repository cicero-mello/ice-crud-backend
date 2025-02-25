import { IceCreamBall, IceCreamBallConstructor } from "./ice-cream-ball"
import { IceCreamCone } from "./ice-cream-cone"
import { IceCreamCup } from "./ice-cream-cup"
import { nanoid } from "nanoid"

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

export class IceCream {
    private readonly props: IceCreamProps

    get id () {
        return this.props.id
    }

    get name () {
        return this.props.name
    }

    get balls () {
        return [...this.props.balls]
    }

    get base () {
        return this.props.base
    }

    rename (name: string) {
        this.props.name = name
    }

    addBall (ball: IceCreamBallConstructor) {
        this.props.balls.push(new IceCreamBall(ball))
    }

    updateBall (ballId: string, update: Partial<IceCreamBallConstructor>) {
        const index = this.props.balls.findIndex(
            (ball) => ball.id === ballId
        )
        if (index !== -1) {
            this.props.balls[index].updateBall(update)
        }
    }

    removeBall (ballId: string) {
        this.props.balls = this.props.balls.filter(
            (ball) => ball.id !== ballId
        )
    }

    updateBase (base: IceCreamCone | IceCreamCup) {
        this.props.base = base
    }

    constructor (props: IceCreamConstructor) {
        this.props = {
            balls: props.balls,
            base: props.base,
            name: props.name,
            id: nanoid()
        }
    }
}
