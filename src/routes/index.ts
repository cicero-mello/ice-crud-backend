import { FastifyInstance } from "fastify"
import { getWelcome } from "./get-welcome"

export const createRoutes = (fastify: FastifyInstance) => {
    getWelcome(fastify)
}
