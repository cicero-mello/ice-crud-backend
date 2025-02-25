import { IceCream } from "#classes/ice-cream"
import { Avatar } from "#types"

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
