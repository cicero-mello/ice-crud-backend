import { IceCreamCone } from "#entities"
import { prisma } from "#libs/prisma"
import {
    CreateIceCreamConeParams,
    IceCreamConeResponse,
    IceCreamConeRepo,
    IceCreamConeDBRow
} from "#repositories"

export class IceCreamConeRepoSQL implements IceCreamConeRepo {

    async create({
        iceCreamCone,
        iceCreamId
    }: CreateIceCreamConeParams): Promise<IceCreamConeDBRow> {
        const { id, color, size } = iceCreamCone

        await prisma.iceCreamCone.create({
            data: { color, size, id, iceCreamId }
        })

        return {
            color, size, id, iceCreamId
        }
    }

    async update({
        iceCreamCone,
        iceCreamId
    }: CreateIceCreamConeParams): Promise<IceCreamConeResponse> {
        const { id, color, size } = iceCreamCone

        await prisma.iceCreamCone.update({
            where: { id: id },
            data: { iceCreamId, color, size }
        })

        return {
            iceCreamConeDBRow: { id, iceCreamId, color, size },
            iceCreamCone: iceCreamCone
        }
    }

    async getByIceCream(iceCreamId: string): Promise<
        IceCreamConeResponse
    > {
        const cone = await prisma.iceCreamCone.findUnique({
            where: { iceCreamId: iceCreamId }
        })

        if (!cone) {
            throw new Error("This Ice Cream Doesn't Have Cone!")
        }

        return {
            iceCreamConeDBRow: cone,
            iceCreamCone: new IceCreamCone({
                color: cone.color,
                size: cone.size,
                id: cone.id
            }),
        }
    }

    async deleteByIceCream(iceCreamId: string): Promise<void> {
        await prisma.iceCreamCone.delete({
            where: { iceCreamId: iceCreamId }
        })
    }

    async iceCreamHaveCone(iceCreamId: string): Promise<boolean> {
        const cone = await prisma.iceCreamCone.findUnique({
            where: { iceCreamId: iceCreamId }
        })

        return !!cone
    }

    async alreadyExists(iceCreamConeId: string): Promise<boolean> {
        const cone = await prisma.iceCreamCone.findUnique({
            where: { id: iceCreamConeId }
        })
        return !!cone
    }
}
