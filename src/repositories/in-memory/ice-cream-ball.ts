import {
    CreateIceCreamBallParams,
    IceCreamBallDBRow,
    IceCreamBallRepo,
} from "#repositories"

export class IceCreamBallRepoInMemory implements IceCreamBallRepo {
    public iceCreamBalls: IceCreamBallDBRow[] = []

    async create({
        iceCreamBall,
        iceCreamId
    }: CreateIceCreamBallParams) {
        const { flavor, id, size } = iceCreamBall

        this.iceCreamBalls.push({
            flavor, id, size, iceCreamId
        })

        return {
            flavor, id, size, iceCreamId
        }
    }

    async alreadyExists(iceCreamBallId: string) {
        return this.iceCreamBalls.some(
            ({ id }) => id === iceCreamBallId
        )
    }
}
