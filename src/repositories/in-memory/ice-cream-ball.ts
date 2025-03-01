import { IceCreamBall } from "#entities"
import {
    CreateIceCreamBallParams,
    IceCreamBallDBRow,
    IceCreamBallRepo,
    IceCreamBallResponse,
    UpdateIceCreamBallParams,
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

    async update({
        iceCreamBall,
        iceCreamId
    }: UpdateIceCreamBallParams): Promise<IceCreamBallResponse> {
        const { flavor, id, size } = iceCreamBall

        this.iceCreamBalls = this.iceCreamBalls.map((ball) => {
            if(ball.id === id){
                return {
                    flavor, id, size, iceCreamId
                }
            }
            return ball
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
        const balls = this.iceCreamBalls.filter(
            (ball) => ball.iceCreamId === iceCreamId
        )
        return balls.map((ball) => ({
            iceCreamBallDBRow: ball,
            iceCreamBall: new IceCreamBall({
                flavor: ball.flavor,
                size: ball.size,
                id: ball.id
            })
        }))
    }

    async alreadyExists(iceCreamBallId: string) {
        return this.iceCreamBalls.some(
            ({ id }) => id === iceCreamBallId
        )
    }
}
