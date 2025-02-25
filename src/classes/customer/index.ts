import { generateSalt, generateHash } from "#utils/crypto"
import { IceCream } from "../ice-cream"
import { nanoid } from "nanoid"
import * as schema from "./schemas"
import * as T from "./types"

export class Customer {
    private readonly props: T.CustomerProps

    get id () {
        return this.props.id
    }

    get name () {
        return this.props.name
    }

    get pass () {
        return this.props.pass
    }

    get salt () {
        return this.props.salt
    }

    get iceCreams () {
        return [...this.props.iceCreams]
    }

    get avatar () {
        return this.props.avatar
    }

    addIceCream (iceCream: IceCream) {
        schema.addIceCream.parse(iceCream)
        this.props.iceCreams.push(iceCream)
    }

    removeIceCream(iceCreamId: string) {
        schema.removeIceCream.parse(iceCreamId)

        this.props.iceCreams = this.props.iceCreams.filter(
            (iceCream) => iceCream.id !== iceCreamId
        )
    }

    constructor (props: T.CustomerConstructor) {
        schema.base.parse(props)

        const salt = generateSalt()
        const pass = generateHash(props.pass, salt)

        this.props = {
            name: props.name,
            pass: pass,
            salt: salt,
            avatar: props.avatar,
            id: nanoid(),
            iceCreams: []
        }
    }
}
