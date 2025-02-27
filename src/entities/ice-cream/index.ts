import { nanoid } from "nanoid"
import * as T from "./types"
import * as schema from "./schemas"
import {
    IceCreamBall,
    IceCreamCup,
    IceCreamCone
} from "#entities"

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
        schema.name.parse(name)
        this.props.name = name
    }

    addBall (ball: IceCreamBall) {
        schema.addBall.parse(ball)
        this.props.balls.push(ball)
    }

    removeBall (ballId: string) {
        schema.removeBall.parse(ballId)
        this.props.balls = this.props.balls.filter(
            (ball) => ball.id !== ballId
        )
    }

    updateBase (base: IceCreamCone | IceCreamCup) {
        schema.updateBase.parse(base)
        this.props.base = base
    }

    constructor (props: T.IceCreamConstructor) {
        schema.base.parse(props)

        this.props = {
            balls: props.balls,
            base: props.base,
            name: props.name,
            id: props.id ?? nanoid()
        }
    }
}
