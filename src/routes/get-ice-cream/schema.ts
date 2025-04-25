import { FastifySchema } from "fastify"

export const schema: FastifySchema = {
    tags: ["ice-cream"],
    description: "Get Ice Cream Data",
    querystring: {
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
                iceCream: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        balls: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: { type: "string" },
                                    flavor: { type: "number" },
                                    size: { type: "number" }
                                }
                            }
                        },
                        baseType: { type: "number" },
                        base: {
                            anyOf: [
                                {
                                    // Cone
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        color: { type: "string" },
                                        size: { type: "number" }
                                    }
                                },
                                {
                                    // Cup
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        size: { type: "number" }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
}
