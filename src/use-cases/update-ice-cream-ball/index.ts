import { IceCreamBallRepo, IceCreamRepo } from "#repositories"
import { zodValidate } from "#utils"
import * as T from "./types"

export class UpdateIceCreamBall implements T.UpdateIceCreamBallUseCase {
    public iceCreamBallRepo: IceCreamBallRepo
    public iceCreamRepo: IceCreamRepo

    async execute({
        iceCreamBall,
        iceCreamId
    }: T.UpdateIceCreamBallRequest): Promise<T.UpdateIceCreamBallResponse> {
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

        if(!ballExists) {
            throw new Error("This Ice Cream Ball Doesn't Exists!")
        }

        await this.iceCreamBallRepo.update({
            iceCreamBall,
            iceCreamId
        })
    }

    constructor(params: T.UpdateIceCreamBallUseCaseConstructor) {
        this.iceCreamBallRepo = params.iceCreamBallRepo
        this.iceCreamRepo = params.iceCreamRepo
    }
}
