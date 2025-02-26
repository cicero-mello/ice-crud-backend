import { BallFlavor, IceCreamBall } from "#entities"
import { Size } from "#enums"

export interface IceCreamBallDBRow {
    id: string
    iceCreamId: string
    flavor: BallFlavor
    size: Size
}

export interface CreateIceCreamBallParams {
    iceCreamBall: IceCreamBall
    iceCreamId: string
}

export interface IceCreamBallRepo {
    iceCreamBalls: IceCreamBallDBRow[]
    create(params: CreateIceCreamBallParams): Promise<void>
    alreadyExists(iceCreamBallId: string): Promise<boolean>
}
