import { FastifySchema } from "fastify"

export const schema: FastifySchema = {
    tags: ["customer", "auth"],
    description: "Use the RefreshToken to get a new AccessToken",
    response: {
        200: {
            type: "object",
            properties: {
                accessToken: { type: "string" }
            }
        }
    }
}
