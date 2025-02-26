import * as schema from "./schemas"
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
        schema.base.parse(props)
        this.props = props
    }
}
