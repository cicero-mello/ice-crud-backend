import { Size } from "#enums"

export interface IceCreamCupProps {
    id: string
    size: Size
}

export interface IceCreamCupConstructor {
    size: Size

    id?: string
}
