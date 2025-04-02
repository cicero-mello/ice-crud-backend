import { FastifySchema } from "fastify"

export const schema: FastifySchema = {
    tags: ["customer"],
    description: "Get data about Customer Profile",
    response: {
        200: {
            type: "object",
            properties: {
                id: { type: "string" },
                avatar: { type: "number" },
                name: { type: "string" }
            }
        }
    }
}
