import { IceCreamCone, IceCreamCup } from "#entities"
import { IceCreamBaseType } from "#enums"
import {
    CreateIceCreamRepoParams,
    DeleteIceCreamRepoParams,
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
        iceCreamCupRepo,
        customerRepo
    }: CreateIceCreamRepoParams) {
        const { id, name, balls, base } = iceCream
        const alreadyExists = await this.alreadyExists(iceCream.id)

        if (alreadyExists) {
            throw new Error("Ice Cream Already Exists!")
        }

        const customerExists = await customerRepo.alreadyExists(
            customerId
        )

        if (!customerExists) {
            throw new Error("Invalid Customer Id!")
        }

        const baseType = this.getBaseType(base)

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

        this.iceCreams.push({
            id, name, customerId, baseType
        })

        return {
            id, name, customerId, baseType
        }
    }

    async delete({ iceCreamId }: DeleteIceCreamRepoParams) {
        const iceCreamExists = await this.alreadyExists(
            iceCreamId
        )

        if (!iceCreamExists) {
            throw new Error("This id does not match an existing Ice Cream!")
        }

        const index = this.iceCreams.findIndex(
            ({ id }) => id === iceCreamId
        )

        this.iceCreams.splice(index, 1)
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
            return IceCreamBaseType.Cup
        }

        throw new Error("Invalid Ice Cream Base!")
    }
}
