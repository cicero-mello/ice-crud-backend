import { IceCreamCone, IceCreamCup } from "#entities"
import { IceCreamBaseType } from "#enums"
import {
    CreateIceCreamParams,
    IceCreamDBRow,
    IceCreamRepo
} from "#repositories"

export class IceCreamRepoInMemory implements IceCreamRepo {
    public iceCreams: IceCreamDBRow[] = []

    async create({
        iceCream,
        customerId,
        iceCreamBallRepo,
        iceCreamConeRepo,
        iceCreamCupRepo
    }: CreateIceCreamParams) {
        const { id, name, balls, base } = iceCream
        const alreadyExists = await this.alreadyExists(iceCream.id)

        if (alreadyExists) {
            throw new Error("Ice Cream Already Exists!")
        }

        const baseType = this.getBaseType(base)

        this.iceCreams.push({
            id, name, customerId, baseType
        })

        balls.forEach(ball => {
            iceCreamBallRepo.create({
                iceCreamBall: ball,
                iceCreamId: iceCream.id
            })
        })

        if (iceCream.base instanceof IceCreamCone) {
            iceCreamConeRepo.create({
                iceCreamCone: iceCream.base,
                iceCreamId: id
            })
        }
        else if (iceCream.base instanceof IceCreamCup) {
            iceCreamCupRepo.create({
                iceCreamCup: iceCream.base,
                iceCreamId: id
            })
        }
        else {
            throw new Error("Invalid Base!")
        }
    }

    async alreadyExists(iceCreamId: string) {
        return this.iceCreams.some(
            ({ id }) => id === iceCreamId
        )
    }

    private getBaseType(
        base: IceCreamCone | IceCreamCup
    ) {
        if (base instanceof IceCreamCone) {
            return IceCreamBaseType.Cone
        }

        if (base instanceof IceCreamCup) {
            return IceCreamBaseType.Cone
        }

        throw new Error("Invalid Ice Cream Base!")
    }
}
