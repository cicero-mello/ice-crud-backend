import { nanoid } from "nanoid"
import * as schema from "./schemas"
import * as T from "./types"

export class IceCreamCup {
    private readonly props: T.IceCreamCupProps

    get id () {
        return this.props.id
    }

    get size () {
        return this.props.size
    }

    constructor (props: T.IceCreamCupConstructor) {
        schema.base.parse(props)

        this.props = {
            size: props.size,
            id: props.id ?? nanoid()
        }
    }
}
