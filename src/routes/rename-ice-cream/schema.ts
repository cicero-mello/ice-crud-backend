import { FastifySchema } from "fastify"

export const schema: FastifySchema = {
    tags: ["ice-cream"],
    description: "Rename an existing ice cream",
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
        required: ["iceCreamId", "newIceCreamName"],
        properties: {
            iceCreamId: { type: "string" },
            newIceCreamName: { type: "string" }
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
