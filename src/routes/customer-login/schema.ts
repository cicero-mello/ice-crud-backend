import { FastifySchema } from "fastify"

export const schema: FastifySchema = {
    tags: ["customer", "auth"],
    description: "Customer Login",
    body: {
        type: "object",
        required: ["name", "pass"],
        properties: {
            name: { type: "string" },
            pass: { type: "string" }
        }
    },
    response: {
        200: {
            type: "object",
            properties: {
                refreshToken: { type: "string" },
                accessToken: { type: "string" }
            }
        }
    }
}
