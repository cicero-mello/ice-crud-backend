import { FastifySchema } from "fastify"

export const schema: FastifySchema = {
    tags: ["ice-cream"],
    description: "Update an existing Ice Cream Ball",
    body: {
        type: "object",
        required: ["iceCreamId", "ball"],
        properties: {
            iceCreamId: { type: "string" },
            ball: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    flavor: { type: "number" },
                    size: { type: "number" }
                }
            }
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
