import { schema } from "./schema"
import * as T from "./types"

export class IceCreamCup {
    private readonly props: T.IceCreamCupProps

    get size () {
        return this.props.size
    }

    constructor (props: T.IceCreamCupConstructor) {
        schema.parse(props)
        this.props = props
    }
}
