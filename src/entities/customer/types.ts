import { IceCream } from "#entities/ice-cream"
import { Avatar } from "#enums"

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
