import { IceCreamCone, IceCreamCup } from "#entities"
import * as R from "#repositories"

export type UpdateIceCreamBaseResponse = void

export interface UpdateIceCreamBaseRequest {
    base: IceCreamCup | IceCreamCone
    iceCreamId: string
}

export interface UpdateIceCreamBaseUseCase {
    iceCreamConeRepo: R.IceCreamConeRepo
    iceCreamCupRepo: R.IceCreamCupRepo
    iceCreamRepo: R.IceCreamRepo

    execute(
        params: UpdateIceCreamBaseRequest
    ): Promise<UpdateIceCreamBaseResponse>
}

export interface UpdateIceCreamBaseUseCaseConstructor {
    iceCreamConeRepo: R.IceCreamConeRepo
    iceCreamCupRepo: R.IceCreamCupRepo
    iceCreamRepo: R.IceCreamRepo
}
