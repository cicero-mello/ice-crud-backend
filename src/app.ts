import Fastify from "fastify"
import { registerRoutes } from "#routes"
import { setupSwagger } from "#libs/swagger"
import cors from "@fastify/cors"

const fastify = Fastify()

fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
})

const start = async () => {
    try {
        console.log("⏳ Loading...")
        await setupSwagger(fastify)
        registerRoutes(fastify)
        await fastify.listen({ port: 8080 })

        console.clear()
        console.log('🍦 API Running in: http://localhost:8080')
        console.log('📄 Docs Running in: http://localhost:8080/docs')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
