import { FastifySchema } from "fastify"

export const schema: FastifySchema = {
    tags: ["customer", "ice-cream"],
    description: "Get All Customer Ice Creams",
    response: {
        200: {
            type: "object",
            properties: {
                iceCreams: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            name: { type: "string" },
                            baseType: { type: "number" },
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
}
