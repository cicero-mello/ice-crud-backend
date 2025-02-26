import { IceCreamCone } from "#entities"
import { Size } from "#enums"

export interface IceCreamConeDBRow {
    id: string
    iceCreamId: string
    color: string
    size: Size
}

export interface CreateIceCreamConeParams {
    iceCreamCone: IceCreamCone
    iceCreamId: string
}

export interface IceCreamConeRepo {
    iceCreamCones: IceCreamConeDBRow[]
    create(params: CreateIceCreamConeParams): Promise<void>
    alreadyExists(iceCreamConeId: string): Promise<boolean>
}
