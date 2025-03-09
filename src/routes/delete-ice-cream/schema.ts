import { FastifySchema } from "fastify"

export const schema: FastifySchema = {
    tags: ["ice-cream"],
    description: "Delete a ice cream",
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
        required: ["iceCreamId"],
        properties: {
            iceCreamId: { type: "string" }
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
