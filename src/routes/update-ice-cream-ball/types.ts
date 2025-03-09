import { IceCreamBallProps } from "#entities"
import { IceCreamBallRepo, IceCreamRepo } from "#repositories"
import { FastifyRequest as FR } from "fastify"

export interface PatchUpdateIceCreamBallRequest {
    iceCreamId: string
    ball: IceCreamBallProps
}

export type FastifyRequest = FR<{
    Body: PatchUpdateIceCreamBallRequest
    Headers: { accessToken: string }
}>

export interface Repos {
    iceCreamBallRepo: IceCreamBallRepo
    iceCreamRepo: IceCreamRepo
}
