import { FastifyInstance } from "fastify"
import swagger from "@fastify/swagger"
import swaggerUI from "@fastify/swagger-ui"

export const setupSwagger = async (fastify: FastifyInstance) => {
    await fastify.register(swagger, {
        openapi: {
            info: {
                title: "Minha API",
                description: "Documentação automática usando Swagger",
                version: "1.0.0"
            },
            tags: [
                { name: "user", description: "user endpoints"}
            ]
        }
    })

    await fastify.register(swaggerUI, {
        routePrefix: "/docs"
    })
}
