import { IceCreamBall } from "#entities"
import { IceCreamBallRepo, IceCreamRepo } from "#repositories"

export type AddIceCreamBallResponse = void

export interface AddIceCreamBallRequest {
    iceCreamBall: IceCreamBall
    iceCreamId: string
}

export interface AddIceCreamBallUseCase {
    iceCreamBallRepo: IceCreamBallRepo
    iceCreamRepo: IceCreamRepo
    execute(
        params: AddIceCreamBallRequest
    ): Promise<AddIceCreamBallResponse>
}

export interface AddIceCreamBallUseCaseConstructor {
    iceCreamBallRepo: IceCreamBallRepo
    iceCreamRepo: IceCreamRepo
}
