import { Size } from "#enums"

export interface IceCreamCupProps {
    id: string
    size: Size
}

export type IceCreamCupConstructor = Omit<
    IceCreamCupProps,
    "id"
>
