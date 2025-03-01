import { IceCreamData } from "#entities"
import {
    CustomerRepo,
    IceCreamBallRepo,
    IceCreamConeRepo,
    IceCreamCupRepo,
    IceCreamRepo
} from "#repositories"

export interface GetCustomerIceCreamsRequest {
    customerId: string
}

export interface GetCustomerIceCreamsResponse {
    iceCreams: IceCreamData[]
}

export interface GetCustomerIceCreamsUseCase {
    iceCreamRepo: IceCreamRepo
    iceCreamBallRepo: IceCreamBallRepo
    iceCreamConeRepo: IceCreamConeRepo
    iceCreamCupRepo: IceCreamCupRepo
    execute(
        params: GetCustomerIceCreamsRequest
    ): Promise<GetCustomerIceCreamsResponse>
}

export interface GetCustomerIceCreamsConstructor {
    iceCreamRepo: IceCreamRepo
    iceCreamBallRepo: IceCreamBallRepo
    iceCreamConeRepo: IceCreamConeRepo
    iceCreamCupRepo: IceCreamCupRepo
    customerRepo: CustomerRepo
}
