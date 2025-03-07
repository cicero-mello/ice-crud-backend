import { FastifyRequest as FR } from "fastify"

export interface GetCustomerDataRequest {
    customerId: string
}

export type FastifyRequest = FR<{
    Querystring: GetCustomerDataRequest
}>
