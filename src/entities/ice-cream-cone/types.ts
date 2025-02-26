import { Size } from "#enums"

export interface IceCreamConeProps {
    id: string
    color: string
    size: Size
}

export type IceCreamConeConstructor = Omit<
    IceCreamConeProps,
    "id"
>
