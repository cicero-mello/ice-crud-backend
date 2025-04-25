import { IceCreamConeRepo, IceCreamCupRepo, IceCreamRepo } from "#repositories"
import { FastifyRequest as FR } from "fastify"

export interface GetIceCreamDataRequest {
    iceCreamId: string
}

export type FastifyRequest = FR<{
    Querystring: GetIceCreamDataRequest
}>

export interface Repos {
    iceCreamConeRepo: IceCreamConeRepo
    iceCreamCupRepo: IceCreamCupRepo
    iceCreamRepo: IceCreamRepo
}
