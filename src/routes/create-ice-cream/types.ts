import { BallFlavor, Size } from "#enums"
import { CustomerRepo, IceCreamBallRepo, IceCreamConeRepo, IceCreamCupRepo, IceCreamRepo } from "#repositories"
import { FastifyRequest as FR } from "fastify"

export interface CreateIceCreamRequest {
    name: string
    customerId: string
    balls: {
        flavor: BallFlavor
        size: Size
    }[]
    cone?: {
        color: string
        size: Size
    }
    cup?: {
        size: Size
    }
}

export type FastifyRequest = FR<{
    Body: CreateIceCreamRequest
}>

export interface Repos {
    customerRepo: CustomerRepo
    iceCreamBallRepo: IceCreamBallRepo
    iceCreamConeRepo: IceCreamConeRepo
    iceCreamCupRepo: IceCreamCupRepo
    iceCreamRepo: IceCreamRepo
}
