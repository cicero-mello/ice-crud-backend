import { FastifySchema } from "fastify"

export const schema: FastifySchema = {
    tags: ["customer"],
    description: "Get data about Customer Profile",
    querystring: {
        type: "object",
        required: ["customerId"],
        properties: {
            customerId: { type: "string" }
        }
    },
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
