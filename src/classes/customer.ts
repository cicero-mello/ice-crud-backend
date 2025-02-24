import { IceCream } from "./ice-cream"
import { Avatar } from "../types"
import { nanoid } from "nanoid"

export interface CustomerProps {
    id: string
    name: string
    iceCreams: IceCream[]
    avatar: Avatar
}

export type CustomerConstructor = Omit<
    CustomerProps,
    "id" | "iceCreams"
>

export class Customer {
    private readonly props: CustomerProps

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

    constructor (props: CustomerConstructor) {
        this.props = {
            name: props.name,
            avatar: props.avatar,
            id: nanoid(),
            iceCreams: []
        }
    }
}
