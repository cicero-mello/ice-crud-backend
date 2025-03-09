import { FastifyRequest as FR } from "fastify"

export interface PatchRenameIceCreamRequest {
    iceCreamId: string
    newIceCreamName: string
}

export type FastifyRequest = FR<{
    Body: PatchRenameIceCreamRequest
    Headers: { accessToken: string }
}>
