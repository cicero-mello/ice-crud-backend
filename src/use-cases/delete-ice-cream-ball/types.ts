import { IceCreamBallRepo } from "#repositories"

export type DeleteIceCreamBallResponse = void

export interface DeleteIceCreamBallRequest {
    iceCreamBallId: string
}

export interface DeleteIceCreamBallUseCase {
    iceCreamBallRepo: IceCreamBallRepo
    execute(
        params: DeleteIceCreamBallRequest
    ): Promise<DeleteIceCreamBallResponse>
}

export interface AddIceCreamBallUseCaseConstructor {
    iceCreamBallRepo: IceCreamBallRepo
}
