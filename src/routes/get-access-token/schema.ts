import { FastifySchema } from "fastify"

export const schema: FastifySchema = {
    tags: ["customer", "auth"],
    description: "Use the RefreshToken to get a new AccessToken",
    headers: {
        type: "object",
        required: ["refreshToken"],
        properties: {
            refreshToken: {
                type: "string"
            }
        }
    },
    response: {
        200: {
            type: "object",
            properties: {
                accessToken: { type: "string" }
            }
        }
    }
}
