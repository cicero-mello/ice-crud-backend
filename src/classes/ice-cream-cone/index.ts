import { schema } from "./schema"
import * as T from "./types"

export class IceCreamCone {
    private readonly props: T.IceCreamConeProps

    get color () {
        return this.props.color
    }

    get size () {
        return this.props.size
    }

    constructor (props: T.IceCreamConeConstructor) {
        schema.parse(props)
        this.props = props
    }
}
