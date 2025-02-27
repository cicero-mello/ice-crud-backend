import { IceCreamRepo } from "#repositories"

export interface DeleteIceCreamRequest {
    iceCreamId: string
}

export type DeleteIceCreamResponse = Promise<void>

export interface DeleteIceCreamUseCase {
    iceCreamRepo: IceCreamRepo
    execute(
        params: DeleteIceCreamRequest
    ): DeleteIceCreamResponse
}

export interface DeleteIceCreamUseCaseConstructor {
    iceCreamRepo: IceCreamRepo
}
