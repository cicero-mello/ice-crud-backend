import { IceCreamBallRepo, IceCreamRepo } from "#repositories"
import { zodValidate } from "#utils"
import * as T from "./types"

export class AddIceCreamBall implements T.AddIceCreamBallUseCase {
    public iceCreamBallRepo: IceCreamBallRepo
    public iceCreamRepo: IceCreamRepo

    async execute({
        iceCreamBall,
        iceCreamId
    }: T.AddIceCreamBallRequest): Promise<T.AddIceCreamBallResponse> {
        zodValidate.id.parse(iceCreamId)

        const iceCreamExists = this.iceCreamRepo.alreadyExists(
            iceCreamId
        )

        if(!iceCreamExists) {
            throw new Error("Ice Cream Id Doesn't Match any Ice Cream!")
        }

        const ballExists = await this.iceCreamBallRepo.alreadyExists(
            iceCreamBall.id
        )

        if(!!ballExists) {
            throw new Error("This Ice Cream Ball Already Exists!")
        }

        await this.iceCreamBallRepo.create({
            iceCreamBall,
            iceCreamId
        })
    }

    constructor(params: T.AddIceCreamBallUseCaseConstructor) {
        this.iceCreamBallRepo = params.iceCreamBallRepo
        this.iceCreamRepo = params.iceCreamRepo
    }
}
