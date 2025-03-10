import { FastifySchema } from "fastify"

export const schema: FastifySchema = {
    tags: ["customer"],
    description: "Delete a customer",
    headers: {
        type: "object",
        required: ["accessToken"],
        properties: {
            accessToken: {
                type: "string"
            }
        }
    },
    body: {
        type: "object",
        required: ["name", "pass"],
        properties: {
            name: { type: "string" },
            pass: { type: "string" }
        }
    },
    response: {
        200: {
            type: "object",
            properties: {
                message: { type: "string" }
            }
        }
    }
}
