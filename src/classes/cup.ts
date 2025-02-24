import { Size } from "../types"

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
        this.props = props
    }
}
