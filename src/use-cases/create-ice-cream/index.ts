import { IceCream, IceCreamCone, IceCreamCup } from "#entities"
import { IceCreamBaseType } from "#enums"
import { zodValidate } from "#utils"
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
        zodValidate.id.parse(customerId)

        const newIceCream = new IceCream({
            balls: iceCream.balls,
            base: iceCream.base,
            name: iceCream.name,
            id: iceCream.id ?? undefined
        })
        await this.validate(newIceCream, customerId)

        const baseType = (
            iceCream.base instanceof IceCreamCup ?
                IceCreamBaseType.Cup : IceCreamBaseType.Cone
        )

        const iceCreamDBRow = await this.iceCreamRepo.create({
            customerId: customerId,
            iceCream: newIceCream,
            baseType: baseType
        })

        await this.createBase(newIceCream)
        await this.createBalls(newIceCream)

        return {
            iceCream: newIceCream,
            iceCreamDBRow
        }
    }

    private async validate(iceCream: IceCream, customerId: string) {
        const iceCreamExists = await this.iceCreamRepo.alreadyExists(
            iceCream.id
        )
        if (iceCreamExists) {
            throw new Error("This Ice Cream Already Exists!")
        }
        const customerExists = await this.customerRepo.alreadyExists(
            customerId
        )
        if (!customerExists) {
            throw new Error("Invalid Customer Id!")
        }
    }

    private async createBalls(iceCream: IceCream) {
        iceCream.balls.forEach(async (ball, index) => {
            const alreadyExists = await this.iceCreamBallRepo.alreadyExists(
                ball.id
            )

            if (alreadyExists) {
                throw new Error("This Ice Cream Ball Already Exists!")
            }

            const subtractSeconds = (date: Date, seconds: number): Date => (
                new Date(date.getTime() - seconds * 1000)
            )

            const getCreatedAt = () => {
                const now = new Date()
                return subtractSeconds(now, index)
            }

            await this.iceCreamBallRepo.create({
                iceCreamBall: ball,
                createdAt: getCreatedAt(),
                iceCreamId: iceCream.id
            })
        })
    }

    private async createBase(iceCream: IceCream) {
        if (iceCream.base instanceof IceCreamCone) {
            const alreadyExists = await this.iceCreamCupRepo.alreadyExists(
                iceCream.base.id
            )
            if (alreadyExists) {
                throw new Error("This Cup Already Exists!")
            }
            await this.iceCreamConeRepo.create({
                iceCreamCone: iceCream.base,
                iceCreamId: iceCream.id
            })
            return IceCreamBaseType.Cone
        }

        if (iceCream.base instanceof IceCreamCup) {
            const alreadyExists = await this.iceCreamCupRepo.alreadyExists(
                iceCream.base.id
            )
            if (alreadyExists) {
                throw new Error("This Cone Already Exists!")
            }
            await this.iceCreamCupRepo.create({
                iceCreamCup: iceCream.base,
                iceCreamId: iceCream.id
            })
            return IceCreamBaseType.Cup
        }

        throw new Error("Invalid Base!")
    }

    constructor(params: T.CreateIceCreamUseCaseConstructor) {
        this.iceCreamRepo = params.iceCreamRepo
        this.iceCreamCupRepo = params.iceCreamCupRepo
        this.iceCreamConeRepo = params.iceCreamConeRepo
        this.iceCreamBallRepo = params.iceCreamBallRepo
        this.customerRepo = params.customerRepo
    }
}
