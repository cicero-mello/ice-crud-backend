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

        if(base instanceof IceCreamCone){
            const iceCreamAlreadyHaveCone = await this.iceCreamConeRepo.iceCreamHaveCone(
                iceCreamId
            )

            if(iceCreamAlreadyHaveCone){
                await this.iceCreamConeRepo.update({
                    iceCreamId,
                    iceCreamCone: base
                })
                return
            }

            await this.iceCreamCupRepo.deleteByIceCream(iceCreamId)
            await this.iceCreamConeRepo.create({
                iceCreamId,
                iceCreamCone: base
            })
            return
        }

        if(base instanceof IceCreamCup){
            const iceCreamAlreadyHaveCup = await this.iceCreamCupRepo.iceCreamHaveCup(
                iceCreamId
            )

            if(iceCreamAlreadyHaveCup){
                await this.iceCreamCupRepo.update({
                    iceCreamId,
                    iceCreamCup: base,
                })
                return
            }
            await this.iceCreamConeRepo.deleteByIceCream(iceCreamId)
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
