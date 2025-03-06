import Fastify from "fastify"
import { registerRoutes } from "#routes"
import { setupSwagger } from "#libs/swagger"

const fastify = Fastify()

const start = async () => {
    try {
        console.log("⏳ Loading...")
        await setupSwagger(fastify)
        registerRoutes(fastify)
        await fastify.listen({ port: 3000 })

        console.clear()
        console.log('🍦 API Running in: http://localhost:3000')
        console.log('📄 Docs Running in: http://localhost:3000/docs')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
