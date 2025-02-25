import { nanoid } from "nanoid"
import * as T from "./types"
import {
    IceCreamBallConstructor,
    IceCreamBall,
    IceCreamCup,
    IceCreamCone
} from "#classes"

export class IceCream {
    private readonly props: T.IceCreamProps

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

    constructor (props: T.IceCreamConstructor) {
        this.props = {
            balls: props.balls,
            base: props.base,
            name: props.name,
            id: nanoid()
        }
    }
}
