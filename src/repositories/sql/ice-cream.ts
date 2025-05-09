import { IceCream, IceCreamCone, IceCreamCup } from "#entities"
import { IceCreamBaseType } from "#enums"
import { prisma } from "#libs/prisma"
import {
    CreateIceCreamRepoParams,
    DeleteIceCreamRepoParams,
    GetBaseIceCreamRepoResponse,
    IceCreamBallRepo,
    IceCreamConeRepo,
    IceCreamCupRepo,
    IceCreamDBRow,
    IceCreamRepo,
    IceCreamRepoConstructor,
    IceCreamRepoResponse,
    UpdateBaseTypeParams
} from "#repositories"

export class IceCreamRepoSQL implements IceCreamRepo {

    public iceCreamCupRepo: IceCreamCupRepo
    public iceCreamConeRepo: IceCreamConeRepo
    public iceCreamBallRepo: IceCreamBallRepo

    async create({
        iceCream, baseType, customerId
    }: CreateIceCreamRepoParams): Promise<IceCreamDBRow> {
        const { id, name } = iceCream

        await prisma.iceCream.create({
            data: { id, name, customerId, baseType }
        })

        return {
            id, name, customerId, baseType
        }
    }

    async update(iceCream: IceCream): Promise<void> {
        const { base, baseType } = await this.getBase(iceCream)
        if (base instanceof IceCreamCone) {
            await this.iceCreamConeRepo.update({
                iceCreamCone: base,
                iceCreamId: iceCream.id
            })
        }
        if (base instanceof IceCreamCup) {
            await this.iceCreamCupRepo.update({
                iceCreamCup: base,
                iceCreamId: iceCream.id
            })
        }

        iceCream.balls.forEach((ball) => {
            this.iceCreamBallRepo.update({
                iceCreamBall: ball,
                iceCreamId: iceCream.id
            })
        })

        await prisma.iceCream.update({
            where: { id: iceCream.id },
            data: {
                baseType: baseType,
                name: iceCream.name
            }
        })
    }

    async updateBaseType({
        baseType,
        iceCreamId
    }: UpdateBaseTypeParams): Promise<void> {
        await prisma.iceCream.update({
            where: { id: iceCreamId },
            data: {
                baseType: baseType
            }
        })
    }

    async delete({
        iceCreamId
    }: DeleteIceCreamRepoParams): Promise<void> {
        const iceCream = await this.getById(iceCreamId)

        await Promise.all(iceCream.iceCream.balls.map(async (ball) => (
            await this.iceCreamBallRepo.delete(ball.id)
        )))

        if (iceCream.iceCreamDBRow.baseType === IceCreamBaseType.Cone) {
            await this.iceCreamConeRepo.deleteByIceCream(iceCreamId)
        }
        else if (iceCream.iceCreamDBRow.baseType === IceCreamBaseType.Cup) {
            await this.iceCreamCupRepo.deleteByIceCream(iceCreamId)
        }

        await prisma.iceCream.delete({
            where: { id: iceCreamId }
        })
    }

    async getByCustomer(customerId: string): Promise<IceCreamDBRow[]> {
        const iceCreams = await prisma.iceCream.findMany({
            where: { customerId: customerId },
            orderBy: {
                createdAt: 'desc',
            }
        })

        return iceCreams
    }

    async getById(iceCreamId: string): Promise<IceCreamRepoResponse> {
        const iceCreamDBRow = await prisma.iceCream.findUnique({
            where: { id: iceCreamId }
        })

        if (!iceCreamDBRow) {
            throw new Error("This id does not match an existing Ice Cream!")
        }

        const balls = await this.iceCreamBallRepo.getByIceCream(iceCreamId)

        let base: IceCreamCone | IceCreamCup
        if (iceCreamDBRow.baseType === IceCreamBaseType.Cone) {
            const { iceCreamCone } = await this.iceCreamConeRepo.getByIceCream(iceCreamId)
            base = iceCreamCone
        }
        else {
            const { iceCreamCup } = await this.iceCreamCupRepo.getByIceCream(iceCreamId)
            base = iceCreamCup
        }

        return {
            iceCreamDBRow,
            iceCream: new IceCream({
                id: iceCreamDBRow.id,
                name: iceCreamDBRow.name,
                base: base,
                balls: balls.map(({ iceCreamBall }) => iceCreamBall),
            })
        }
    }

    async getBase(iceCream: IceCream): Promise<GetBaseIceCreamRepoResponse> {
        let base: IceCreamCup | IceCreamCone
        let baseType: IceCreamBaseType
        if (iceCream.base instanceof IceCreamCone) {
            const { iceCreamCone } = await this.iceCreamConeRepo.getByIceCream(
                iceCream.id
            )
            base = iceCreamCone
            baseType = IceCreamBaseType.Cone
        }
        else {
            const { iceCreamCup } = await this.iceCreamCupRepo.getByIceCream(
                iceCream.id
            )
            base = iceCreamCup
            baseType = IceCreamBaseType.Cup
        }

        return { base, baseType }
    }

    async alreadyExists(iceCreamId: string): Promise<boolean> {
        const iceCream = await prisma.iceCream.findUnique({
            where: { id: iceCreamId }
        })

        return !!iceCream
    }

    constructor(params: IceCreamRepoConstructor) {
        this.iceCreamBallRepo = params.iceCreamBallRepo
        this.iceCreamConeRepo = params.iceCreamConeRepo
        this.iceCreamCupRepo = params.iceCreamCupRepo
    }
}
