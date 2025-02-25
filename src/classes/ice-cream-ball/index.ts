import { nanoid } from "nanoid"
import { schema, updateBallSchema } from "./schema"
import * as T from "./types"

export class IceCreamBall {
    private readonly props: T.IceCreamBallProps

    get id () {
        return this.props.id
    }

    get flavor () {
        return this.props.flavor
    }

    get size () {
        return this.props.size
    }

    updateBall (update: Partial<T.IceCreamBallConstructor>) {
        updateBallSchema.parse(update)

        this.props.size = update.size ?? this.props.size
        this.props.flavor = update.flavor ?? this.props.flavor
    }

    constructor (props: T.IceCreamBallConstructor) {
        schema.parse(props)

        this.props = {
            flavor: props.flavor,
            size: props.size,
            id: nanoid()
        }
    }
}
