import { FastifySchema } from "fastify"

export const schema: FastifySchema = {
    tags: ["ice-cream"],
    description: "Update an Ice Cream Base",
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
        required: ["iceCreamId", "base", "baseType"],
        properties: {
            iceCreamId: { type: "string" },
            baseType: { type: "number" },
            base: {
                anyOf: [
                    {
                        // Cone
                        type: "object",
                        properties: {
                            color: { type: "string" },
                            size: { type: "number" }
                        }
                    },
                    {
                        // Cup
                        type: "object",
                        properties: {
                            size: { type: "number" }
                        }
                    }
                ]
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
