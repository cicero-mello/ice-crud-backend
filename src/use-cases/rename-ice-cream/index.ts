import { IceCreamRepo } from "#repositories"
import * as T from "./types"
import * as schema from "./schemas"

export class RenameIceCream implements T.RenameIceCreamUseCase {
    public iceCreamRepo: IceCreamRepo

    async execute(params: T.RenameIceCreamRequest) {
        schema.base.parse(params)

        const { iceCream } = await this.iceCreamRepo.getById(params.iceCreamId)
        iceCream.rename(params.newIceCreamName)
        await this.iceCreamRepo.update(iceCream)
    }

    constructor(params: T.RenameIceCreamUseCaseConstructor){
        this.iceCreamRepo = params.iceCreamRepo
    }
}
