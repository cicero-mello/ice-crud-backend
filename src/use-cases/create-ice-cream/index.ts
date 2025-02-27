import { IceCream } from "#entities"
import * as R from "#repositories"
import * as T from "./types"

export class CreateIceCream implements T.CreateIceCreamUseCase {
    public iceCreamRepo: R.IceCreamRepo
    public iceCreamConeRepo: R.IceCreamConeRepo
    public iceCreamCupRepo: R.IceCreamCupRepo
    public iceCreamBallRepo: R.IceCreamBallRepo
    public customerRepo: R.CustomerRepo

    async execute({
        iceCream,
        customerId
    }: T.CreateIceCreamRequest) {
        const newIceCream = new IceCream({
            balls: iceCream.balls,
            base: iceCream.base,
            name: iceCream.name
        })

        const iceCreamDBRow = await this.iceCreamRepo.create({
            customerId,
            iceCream: newIceCream,
            iceCreamConeRepo: this.iceCreamConeRepo,
            iceCreamCupRepo: this.iceCreamCupRepo,
            iceCreamBallRepo: this.iceCreamBallRepo,
            customerRepo: this.customerRepo
        })

        return {
            iceCream: newIceCream,
            iceCreamDBRow
        }
    }

    constructor(params: T.CreateIceCreamUseCaseConstructor) {
        this.iceCreamRepo = params.iceCreamRepo
        this.iceCreamCupRepo = params.iceCreamCupRepo
        this.iceCreamConeRepo = params.iceCreamConeRepo
        this.iceCreamBallRepo = params.iceCreamBallRepo
        this.customerRepo = params.customerRepo
    }
}
