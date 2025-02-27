import { IceCream, IceCreamConstructor } from "#entities"
import {
    CustomerRepo,
    IceCreamBallRepo,
    IceCreamConeRepo,
    IceCreamCupRepo,
    IceCreamDBRow,
    IceCreamRepo
} from "#repositories"

export interface CreateIceCreamRequest {
    iceCream: IceCreamConstructor,
    customerId: string
}

export type CreateIceCreamResponse = Promise<{
    iceCream: IceCream,
    iceCreamDBRow: IceCreamDBRow
}>

export interface CreateIceCreamUseCase {
    iceCreamRepo: IceCreamRepo
    iceCreamConeRepo: IceCreamConeRepo
    iceCreamCupRepo: IceCreamCupRepo
    iceCreamBallRepo: IceCreamBallRepo
    execute(params: CreateIceCreamRequest): CreateIceCreamResponse
}

export interface CreateIceCreamUseCaseConstructor {
    iceCreamRepo: IceCreamRepo
    iceCreamConeRepo: IceCreamConeRepo
    iceCreamCupRepo: IceCreamCupRepo
    iceCreamBallRepo: IceCreamBallRepo
    customerRepo: CustomerRepo
}
