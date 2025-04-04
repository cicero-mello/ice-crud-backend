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

export interface UpdateIceCreamConeParams {
    iceCreamCone: IceCreamCone
    iceCreamId: string
}

export interface IceCreamConeResponse {
    iceCreamCone: IceCreamCone
    iceCreamConeDBRow: IceCreamConeDBRow
}

export interface IceCreamConeRepo {
    create(
        params: CreateIceCreamConeParams
    ): Promise<IceCreamConeDBRow>
    update(
        params: UpdateIceCreamConeParams
    ): Promise<IceCreamConeResponse>
    getByIceCream(
        iceCreamId: string
    ): Promise<IceCreamConeResponse>
    deleteByIceCream(
        iceCreamId: string
    ): Promise<void>
    alreadyExists(iceCreamConeId: string): Promise<boolean>
    iceCreamHaveCone(iceCreamId: string): Promise<boolean>
}
