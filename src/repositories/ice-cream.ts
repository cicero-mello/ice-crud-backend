import { IceCream } from "#entities"
import { IceCreamBaseType } from "#enums"
import {
    IceCreamBallRepo,
    IceCreamConeRepo,
    IceCreamCupRepo
} from "#repositories"

export interface IceCreamDBRow {
    id: string
    customerId: string
    name: string
    baseType: IceCreamBaseType
}

export interface CreateIceCreamParams {
    iceCream: IceCream,
    customerId: string,
    iceCreamBallRepo: IceCreamBallRepo
    iceCreamCupRepo: IceCreamCupRepo
    iceCreamConeRepo: IceCreamConeRepo
}

export interface IceCreamRepo {
    iceCreams: IceCreamDBRow[]
    create(params: CreateIceCreamParams): Promise<void>
    alreadyExists(iceCreamId: string): Promise<boolean>
}
