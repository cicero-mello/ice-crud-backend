import { IceCream } from "#classes/ice-cream"
import { Avatar } from "#types"

export interface CustomerProps {
    id: string
    name: string
    pass: string
    salt: string
    iceCreams: IceCream[]
    avatar: Avatar
}

export type CustomerConstructor = Omit<
    CustomerProps,
    "id" | "iceCreams" | "salt"
>
