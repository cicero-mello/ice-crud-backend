import { IceCream } from "../ice-cream"
import { nanoid } from "nanoid"
import * as T from "./types"

export class Customer {
    private readonly props: T.CustomerProps

    get id () {
        return this.props.id
    }

    get name () {
        return this.props.name
    }

    get iceCreams () {
        return [...this.props.iceCreams]
    }

    get avatar () {
        return this.props.avatar
    }

    addIceCream (iceCream: IceCream) {
        this.props.iceCreams.push(iceCream)
    }

    removeIceCream(iceCreamId: string) {
        this.props.iceCreams = this.props.iceCreams.filter(
            (iceCream) => iceCream.id !== iceCreamId
        )
    }

    constructor (props: T.CustomerConstructor) {
        this.props = {
            name: props.name,
            avatar: props.avatar,
            id: nanoid(),
            iceCreams: []
        }
    }
}
