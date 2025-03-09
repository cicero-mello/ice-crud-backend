import { FastifyRequest as FR } from "fastify"

export type FastifyRequest = FR<{
    Headers: { accessToken: string }
}>
