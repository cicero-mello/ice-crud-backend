import * as R from "#repositories"
import { FastifyRequest as FR } from "fastify"

export interface GetCustomerDataRequest {
    customerId: string
}

export type FastifyRequest = FR<{
    Querystring: GetCustomerDataRequest
    Headers: { accessToken: string }
}>

export interface Repos {
    customerRepo: R.CustomerRepo
    iceCreamBallRepo: R.IceCreamBallRepo
    iceCreamConeRepo: R.IceCreamConeRepo
    iceCreamCupRepo: R.IceCreamCupRepo
    iceCreamRepo: R.IceCreamRepo
}
