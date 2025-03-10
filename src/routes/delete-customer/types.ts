import { FastifyRequest as FR } from "fastify"

export interface DeleteCustomerRequest {
    name: string
    pass: string
}

export type FastifyRequest = FR<{
    Body: DeleteCustomerRequest
    Headers: { accessToken: string }
}>
