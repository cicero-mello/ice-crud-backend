import { FastifySchema } from "fastify"

export const schema: FastifySchema = {
    tags: ["ice-cream"],
    description: "Create a Ice Cream",
    body: {
        type: "object",
        required: ["name", "customerId", "balls"],
        properties: {
            name: { type: "string" },
            customerId: { type: "string" },
            balls: {
                type: "array",
                items: {
                    type: "object",
                    required: ["flavor", "size"],
                    properties: {
                        flavor: { type: "number" },
                        size: { type: "number" }
                    }
                }
            },
            cone: {
                type: "object",
                required: ["color", "size"],
                properties: {
                    color: { type: "string" },
                    size: { type: "number" }
                }
            },
            cup: {
                type: "object",
                required: ["size"],
                properties: {
                    size: { type: "number" }
                }
            }
        }
    },
    response: {
        200: {
            description: "Successful response",
            type: "object",
            properties: {
                message: { type: "string" }
            }
        }
    }
}
