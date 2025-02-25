import { Size } from "../../types"
import { schema } from "./schema"

export interface IceCreamCupProps {
    size: Size
}

export type IceCreamCupConstructor = IceCreamCupProps

export class IceCreamCup {
    private readonly props: IceCreamCupProps

    get size () {
        return this.props.size
    }

    constructor (props: IceCreamCupConstructor) {
        schema.parse(props)
        this.props = props
    }
}
