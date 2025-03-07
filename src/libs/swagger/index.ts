import { FastifyInstance } from "fastify"
import swagger from "@fastify/swagger"
import swaggerUI from "@fastify/swagger-ui"

export const setupSwagger = async (fastify: FastifyInstance) => {
    await fastify.register(swagger, {
        swagger: {
            info: {
                title: "🍨 Ice CRUD 🍨",
                description: "Ice Cream Management API",
                version: "1.0.0"
            },
            tags: [
                { name: "customer", description: "Customer endpoints" },
                { name: "ice-cream", description: "Ice Cream endpoints" }
            ]
        }
    })

    await fastify.register(swaggerUI, {
        routePrefix: "/docs",
        uiConfig: {
            docExpansion: "full",
            deepLinking: false
        }
    })
}
