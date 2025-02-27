import { IceCreamRepo } from "#repositories"
import * as T from "./types"
import * as schema from "./schemas"

export class DeleteIceCream implements T.DeleteIceCreamUseCase {
    public iceCreamRepo: IceCreamRepo

    async execute({ iceCreamId }: T.DeleteIceCreamRequest) {
        schema.base.parse({ iceCreamId })
        this.iceCreamRepo.delete({ iceCreamId })
    }

    constructor(params: T.DeleteIceCreamUseCaseConstructor){
        this.iceCreamRepo = params.iceCreamRepo
    }
}
