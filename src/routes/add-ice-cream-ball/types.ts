import { IceCreamBallRepo, IceCreamRepo } from "#repositories"
import { BallFlavor, Size } from "#enums"
import { FastifyRequest as FR } from "fastify"

export interface AddIceCreamBallRequest {
    ball: {
        flavor: BallFlavor
        size: Size
    }
    iceCreamId: string
}

export type FastifyRequest = FR<{
    Body: AddIceCreamBallRequest
}>

export interface Repos {
    iceCreamBallRepo: IceCreamBallRepo
    iceCreamRepo: IceCreamRepo
}
