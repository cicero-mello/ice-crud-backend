import { Size } from "../types"

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
        this.props = props
    }
}
