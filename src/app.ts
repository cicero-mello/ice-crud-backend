import Fastify from "fastify"
import { registerRoutes } from "#routes"
import { setupSwagger } from "#libs/swagger"
import cors from "@fastify/cors"
import fastifyCookie from "@fastify/cookie"

const fastify = Fastify()

fastify.register(cors, {
    origin:  ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
})

fastify.register(fastifyCookie, {
    secret: "meu-segredo-super-seguro",
    hook: "onRequest",
})

const start = async () => {
    try {
        console.log("⏳ Loading...")
        await setupSwagger(fastify)
        registerRoutes(fastify)
        await fastify.listen({ port: 8080 })

        console.clear()
        console.log("🍦 API Running in: http://localhost:8080")
        console.log("📄 Docs Running in: http://localhost:8080/docs")
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
