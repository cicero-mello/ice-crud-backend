import { FastifySchema } from "fastify"

export const schema: FastifySchema = {
    tags: ["customer"],
    description: "Create a Customer",
    body: {
        type: "object",
        required: ["name", "avatar", "pass"],
        properties: {
            name: { type: "string" },
            avatar: { type: "number" },
            pass: { type: "string" }
        }
    },
    response: {
        200: {
            description: "Successful response",
            type: "object",
            properties: {
                accessToken: { type: "string" },
                refreshToken: { type: "string" }
            }
        }
    }
}
