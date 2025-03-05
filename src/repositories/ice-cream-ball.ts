import { IceCreamBall } from "#entities"
import { Size, BallFlavor } from "#enums"

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

export interface UpdateIceCreamBallParams {
    iceCreamBall: IceCreamBall
    iceCreamId: string
}

export interface IceCreamBallResponse {
    iceCreamBall: IceCreamBall
    iceCreamBallDBRow: IceCreamBallDBRow
}

export interface IceCreamBallRepo {
    iceCreamBalls: IceCreamBallDBRow[]
    create(
        params: CreateIceCreamBallParams
    ): Promise<IceCreamBallDBRow>
    update(
        params: UpdateIceCreamBallParams
    ): Promise<IceCreamBallResponse>
    delete(iceCreamId: string): Promise<void>
    alreadyExists(iceCreamBallId: string): Promise<boolean>
    getByIceCream(
        iceCreamId: string
    ): Promise<IceCreamBallResponse[]>
}
