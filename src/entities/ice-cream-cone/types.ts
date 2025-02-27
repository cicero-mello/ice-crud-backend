import { Size } from "#enums"

export interface IceCreamConeProps {
    id: string
    color: string
    size: Size
}

export interface IceCreamConeConstructor {
    color: string
    size: Size

    id?: string
}
