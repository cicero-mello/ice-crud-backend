import { FastifySchema } from "fastify"

export const schema: FastifySchema = {
    tags: ["ice-cream"],
    description: "Add a ball of ice cream to an existing ice cream",
    body: {
        type: "object",
        required: ["ball", "iceCreamId"],
        properties: {
            iceCreamId: { type: "string" },
            ball: {
                type: "object",
                required: ["flavor", "size"],
                properties: {
                    flavor: { type: "number" },
                    size: { type: "number" }
                }
            },
        }
    },
    response: {
        201: {
            type: "object",
            properties: {
                message: { type: "string" }
            }
        }
    }
}
