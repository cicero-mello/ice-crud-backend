import { FastifyRequest as FR } from "fastify"

export type FastifyRequest = FR<{
    Headers: { refreshToken: string }
}>
