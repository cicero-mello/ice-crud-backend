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
        const alreadyExists = await this.alreadyExists(id)

        if(alreadyExists) {
            throw new Error("This Ice Cream Ball Already Exists!")
        }

        this.iceCreamBalls.push({
            flavor, id, size, iceCreamId
        })
    }

    async alreadyExists(iceCreamBallId: string) {
        return this.iceCreamBalls.some(
            ({ id }) => id === iceCreamBallId
        )
    }
}
