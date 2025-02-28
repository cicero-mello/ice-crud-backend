import { IceCreamRepo } from "#repositories"
import * as T from "./types"
import { zodValidate } from "#utils"

export class DeleteIceCream implements T.DeleteIceCreamUseCase {
    public iceCreamRepo: IceCreamRepo

    async execute({ iceCreamId }: T.DeleteIceCreamRequest) {
        zodValidate.id.parse(iceCreamId)
        this.iceCreamRepo.delete({ iceCreamId })
    }

    constructor(params: T.DeleteIceCreamUseCaseConstructor){
        this.iceCreamRepo = params.iceCreamRepo
    }
}
