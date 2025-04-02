import { FastifyRequest as FR } from "fastify"

export interface DeleteIceCreamRequest {
    iceCreamId: string
}

export type FastifyRequest = FR<{
    Body: DeleteIceCreamRequest
}>
