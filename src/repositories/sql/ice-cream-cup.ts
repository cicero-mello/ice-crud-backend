import { IceCreamCup } from "#entities"
import { prisma } from "#libs/prisma"
import {
    CreateIceCreamCupParams,
    IceCreamCupResponse,
    IceCreamCupRepo
} from "#repositories"

export class IceCreamCupRepoSQL implements IceCreamCupRepo {

    async create({
        iceCreamCup,
        iceCreamId
    }: CreateIceCreamCupParams) {
        const { id, size } = iceCreamCup

        await prisma.iceCreamCup.create({
            data: { id, size, iceCreamId }
        })

        return {
            id, size, iceCreamId
        }
    }

    async update({
        iceCreamCup,
        iceCreamId
    }: CreateIceCreamCupParams): Promise<IceCreamCupResponse> {
        const { id, size } = iceCreamCup

        await prisma.iceCreamCup.update({
            where: { id: id },
            data: { iceCreamId, size }
        })

        return {
            iceCreamCupDBRow: { id, iceCreamId, size },
            iceCreamCup: iceCreamCup
        }
    }

    async getByIceCream(iceCreamId: string): Promise<
        IceCreamCupResponse
    > {
        const cup = await prisma.iceCreamCup.findUnique({
            where: { iceCreamId: iceCreamId }
        })

        if (!cup) {
            throw new Error("This Ice Cream Doesn't Have Cup!")
        }

        return {
            iceCreamCupDBRow: cup,
            iceCreamCup: new IceCreamCup({
                size: cup.size,
                id: cup.id
            })
        }
    }

    async deleteByIceCream(iceCreamId: string){
        await prisma.iceCreamCup.delete({
            where: { iceCreamId: iceCreamId }
        })
    }

    async iceCreamHaveCup(iceCreamId: string): Promise<boolean> {
        const cup = await prisma.iceCreamCup.findUnique({
            where: { iceCreamId: iceCreamId }
        })
        return !!cup
    }

    async alreadyExists(iceCreamCupId: string) {
        const cup = await prisma.iceCreamCup.findUnique({
            where: { id: iceCreamCupId }
        })
        return !!cup
    }
}
