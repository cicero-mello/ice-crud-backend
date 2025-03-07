import { FastifyRequest as FR } from "fastify"

export interface DeleteIceCreamBallRequest {
    iceCreamBallId: string
}

export type FastifyRequest = FR<{
    Body: DeleteIceCreamBallRequest
}>
