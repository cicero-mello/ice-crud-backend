import { IceCreamBall } from "#entities"
import { IceCreamBallRepo, IceCreamRepo } from "#repositories"

export type UpdateIceCreamBallResponse = void

export interface UpdateIceCreamBallRequest {
    iceCreamBall: IceCreamBall
    iceCreamId: string
}

export interface UpdateIceCreamBallUseCase {
    iceCreamBallRepo: IceCreamBallRepo
    iceCreamRepo: IceCreamRepo
    execute(
        params: UpdateIceCreamBallRequest
    ): Promise<UpdateIceCreamBallResponse>
}

export interface UpdateIceCreamBallUseCaseConstructor {
    iceCreamBallRepo: IceCreamBallRepo
    iceCreamRepo: IceCreamRepo
}
