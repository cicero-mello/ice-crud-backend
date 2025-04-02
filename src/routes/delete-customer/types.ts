import { FastifyRequest as FR } from "fastify"

export interface DeleteCustomerRequest {
    pass: string
}

export type FastifyRequest = FR<{
    Body: DeleteCustomerRequest
}>
