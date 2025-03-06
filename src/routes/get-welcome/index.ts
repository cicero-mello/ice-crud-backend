import { FastifyInstance } from "fastify"

export const getWelcome = (fastify: FastifyInstance) => {
    fastify.get(
        '/',
        { schema: swaggerSchema },
        async function handler(request, reply) {
            console.log(request)
            console.log(reply)
            return { hello: 'world' }
        })
}

const swaggerSchema = {
    tags: ["user3"],
    description: 'Returns hello world message',
    response: {
        200: {
            type: 'object',
            properties: {
                hello: { type: 'string' }
            }
        }
    }
}
