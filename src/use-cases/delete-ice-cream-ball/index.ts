import { IceCreamBallRepo } from "#repositories"
import { zodValidate } from "#utils"
import * as T from "./types"

export class DeleteIceCreamBall implements T.DeleteIceCreamBallUseCase {
    public iceCreamBallRepo: IceCreamBallRepo

    async execute({
        iceCreamBallId
    }: T.DeleteIceCreamBallRequest): Promise<T.DeleteIceCreamBallResponse> {
        zodValidate.id.parse(iceCreamBallId)

        const ballExists = await this.iceCreamBallRepo.alreadyExists(
            iceCreamBallId
        )

        if(!ballExists) {
            throw new Error("This Ice Cream Ball Doesn't Exists!")
        }

        await this.iceCreamBallRepo.delete(iceCreamBallId)
    }

    constructor(params: T.DeleteIceCreamBallUseCaseConstructor) {
        this.iceCreamBallRepo = params.iceCreamBallRepo
    }
}
