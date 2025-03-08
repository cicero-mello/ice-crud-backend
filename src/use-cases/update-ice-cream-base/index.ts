import { IceCreamConeRepo, IceCreamCupRepo, IceCreamRepo } from "#repositories"
import { IceCreamCone, IceCreamCup } from "#entities"
import { zodValidate } from "#utils"
import * as T from "./types"

export class UpdateIceCreamBase implements T.UpdateIceCreamBaseUseCase {
    public iceCreamRepo: IceCreamRepo
    public iceCreamConeRepo: IceCreamConeRepo
    public iceCreamCupRepo: IceCreamCupRepo

    async execute({
        base,
        iceCreamId
    }: T.UpdateIceCreamBaseRequest): Promise<T.UpdateIceCreamBaseResponse> {
        zodValidate.id.parse(iceCreamId)

        await this.iceCreamConeRepo.deleteByIceCream(iceCreamId)
        await this.iceCreamCupRepo.deleteByIceCream(iceCreamId)

        if(base instanceof IceCreamCone){
            await this.iceCreamConeRepo.create({
                iceCreamId,
                iceCreamCone: base
            })
            return
        }

        if(base instanceof IceCreamCup){
            await this.iceCreamCupRepo.create({
                iceCreamId,
                iceCreamCup: base,
            })
            return
        }

        throw new Error("Invalid base")
    }

    constructor(params: T.UpdateIceCreamBaseUseCaseConstructor){
        this.iceCreamRepo = params.iceCreamRepo
        this.iceCreamConeRepo = params.iceCreamConeRepo
        this.iceCreamCupRepo = params.iceCreamCupRepo
    }
}
