import { Size } from "../../types"
import { schema } from "./schema"

export interface IceCreamConeProps {
    color: string
    size: Size
}

export type IceCreamConeConstructor = IceCreamConeProps

export class IceCreamCone {
    private readonly props: IceCreamConeProps

    get color () {
        return this.props.color
    }

    get size () {
        return this.props.size
    }

    constructor (props: IceCreamConeConstructor) {
        schema.parse(props)
        this.props = props
    }
}
