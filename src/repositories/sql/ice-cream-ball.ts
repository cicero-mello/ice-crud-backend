import { prisma } from "#libs/prisma"
import { IceCreamBall } from "#entities"
import {
    CreateIceCreamBallParams,
    IceCreamBallDBRow,
    IceCreamBallRepo,
    IceCreamBallResponse,
    UpdateIceCreamBallParams,
} from "#repositories"

export class IceCreamBallRepoSQL implements IceCreamBallRepo {

    async create({
        iceCreamBall,
        iceCreamId
    }: CreateIceCreamBallParams): Promise<IceCreamBallDBRow> {
        const { flavor, id, size } = iceCreamBall

        await prisma.iceCreamBall.create({
            data: { flavor, id, size, iceCreamId }
        })

        return {
            flavor, id, size, iceCreamId
        }
    }

    async delete(iceCreamBallId: string): Promise<void> {
        await prisma.iceCreamBall.delete({
            where: { id: iceCreamBallId }
        })
    }

    async update({
        iceCreamBall,
        iceCreamId
    }: UpdateIceCreamBallParams): Promise<IceCreamBallResponse> {
        const { flavor, id, size } = iceCreamBall

        await prisma.iceCreamBall.update({
            where: { id },
            data: { flavor, size, iceCreamId }
        })

        return {
            iceCreamBall,
            iceCreamBallDBRow: {
                flavor, id, size, iceCreamId
            }
        }
    }

    async getByIceCream(
        iceCreamId: string
    ): Promise<IceCreamBallResponse[]> {
        const balls = await prisma.iceCreamBall.findMany({
            where: { iceCreamId: iceCreamId }
        })

        return balls.map((ball) => ({
            iceCreamBallDBRow: ball,
            iceCreamBall: new IceCreamBall({
                flavor: ball.flavor,
                size: ball.size,
                id: ball.id
            })
        }))
    }

    async alreadyExists(
        iceCreamBallId: string
    ): Promise<boolean> {
        const ball = await prisma.iceCreamBall.findUnique({
            where: { id: iceCreamBallId }
        })

        return !!ball
    }
}
