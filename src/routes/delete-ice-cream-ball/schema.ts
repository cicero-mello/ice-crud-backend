import { FastifySchema } from "fastify"

export const schema: FastifySchema = {
    tags: ["ice-cream"],
    description: "Delete a ball from an existing ice cream",
    body: {
        type: "object",
        required: ["iceCreamBallId"],
        properties: {
            iceCreamBallId: { type: "string" }
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
