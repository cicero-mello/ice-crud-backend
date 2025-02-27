import { IceCream } from "#entities"
import { IceCreamBaseType } from "#enums"
import {
    CustomerRepo,
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

export interface CreateIceCreamRepoParams {
    iceCream: IceCream,
    customerId: string,
    iceCreamBallRepo: IceCreamBallRepo
    iceCreamCupRepo: IceCreamCupRepo
    iceCreamConeRepo: IceCreamConeRepo
    customerRepo: CustomerRepo
}

export interface IceCreamRepo {
    iceCreams: IceCreamDBRow[]
    alreadyExists(iceCreamId: string): Promise<boolean>
    create(params: CreateIceCreamRepoParams): Promise<IceCreamDBRow>
}
