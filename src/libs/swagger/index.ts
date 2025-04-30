import { FastifyInstance } from "fastify"
import swagger from "@fastify/swagger"
import swaggerUI from "@fastify/swagger-ui"

export const setupSwagger = async (fastify: FastifyInstance) => {
    await fastify.register(swagger, {
        swagger: {
            info: {
                title: "🍨 Ice CRUD 🍨",
                description:
                    "Ice Cream Management API.\n\n" +
                    "To use the endpoints, first you need to make a 'customer-login'\n" +
                    "(You can use the 'create-customer' instead).\n\n" +
                    "When your token expires, just use the 'refresh'",
                version: "1.0.0"
            },
            tags: [
                { name: "auth", description: "Authentication endpoints" },
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
