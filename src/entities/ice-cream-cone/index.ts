import { nanoid } from "nanoid"
import * as schema from "./schemas"
import * as T from "./types"

export class IceCreamCone {
    private readonly props: T.IceCreamConeProps

    get id () {
        return this.props.id
    }

    get color () {
        return this.props.color
    }

    get size () {
        return this.props.size
    }

    constructor (props: T.IceCreamConeConstructor) {
        schema.base.parse(props)

        this.props = {
            color: props.color,
            size: props.size,
            id: props.id ?? nanoid()
        }
    }
}
