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

export interface IceCreamCupRepo {
    iceCreamCups: IceCreamCupDBRow[]
    create (params: CreateIceCreamCupParams): Promise<IceCreamCupDBRow>
    alreadyExists (iceCreamCupId: string): Promise<boolean>
    getByIceCream(iceCreamId: string): Promise<IceCreamCupDBRow>
}
