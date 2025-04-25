import { IceCreamData } from "#entities"
import { IceCreamConeRepo, IceCreamCupRepo, IceCreamRepo } from "#repositories"

export interface GetIceCreamRequest {
    iceCreamId: string
}

export interface GetIceCreamResponse {
    iceCream: IceCreamData
}

export interface GetIceCreamUseCase {
    iceCreamRepo: IceCreamRepo
    iceCreamConeRepo: IceCreamConeRepo
    iceCreamCupRepo: IceCreamCupRepo
    execute(
        params: GetIceCreamRequest
    ): Promise<GetIceCreamResponse>
}

export interface GetIceCreamUseCaseConstructor {
    iceCreamRepo: IceCreamRepo
    iceCreamConeRepo: IceCreamConeRepo
    iceCreamCupRepo: IceCreamCupRepo
}
