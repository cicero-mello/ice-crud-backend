import { IceCreamCup } from "#entities"
import { Size } from "#enums"

export interface IceCreamCupDBRow {
    id: string
    iceCreamId: string
    size: Size
}

export interface CreateIceCreamCupParams {
    iceCreamCup: IceCreamCup
    iceCreamId: string
}

export interface UpdateIceCreamCupParams {
    iceCreamCup: IceCreamCup
    iceCreamId: string
}

export interface IceCreamCupResponse {
    iceCreamCup: IceCreamCup
    iceCreamCupDBRow: IceCreamCupDBRow
}

export interface IceCreamCupRepo {
    create(
        params: CreateIceCreamCupParams
    ): Promise<IceCreamCupDBRow>
    update(
        params: UpdateIceCreamCupParams
    ): Promise<IceCreamCupResponse>
    alreadyExists(iceCreamCupId: string): Promise<boolean>
    deleteByIceCream(iceCreamId: string): Promise<void>
    getByIceCream(iceCreamId: string): Promise<
        IceCreamCupResponse
    >
    iceCreamHaveCup(iceCreamId: string): Promise<boolean>
}
