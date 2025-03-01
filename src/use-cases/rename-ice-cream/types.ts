import { IceCreamRepo } from "#repositories"

export interface RenameIceCreamRequest {
    iceCreamId: string
    newIceCreamName: string
}

export type RenameIceCreamResponse = void

export interface RenameIceCreamUseCase {
    iceCreamRepo: IceCreamRepo
    execute(
        params: RenameIceCreamRequest
    ): Promise<RenameIceCreamResponse>
}

export interface RenameIceCreamUseCaseConstructor {
    iceCreamRepo: IceCreamRepo
}
