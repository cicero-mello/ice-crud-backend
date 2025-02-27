import { IceCream } from "#entities/ice-cream"
import { Avatar } from "#enums"

export interface CustomerProps {
    id: string
    name: string
    hash: string
    salt: string
    iceCreams: IceCream[]
    avatar: Avatar
}

export interface CustomerConstructor {
    name: string
    avatar: Avatar
    pass?: string

    id?: string
    iceCreams?: IceCream[]
    salt?: string
    hash?: string
}
