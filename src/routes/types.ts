import { FastifyReply, FastifyRequest } from "fastify"

export type PreValidation = (
    request: FastifyRequest<any>, reply: FastifyReply<any>
) => Promise<void>
