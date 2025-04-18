import { FastifySchema } from "fastify"

export const schema: FastifySchema = {
    tags: ["customer"],
    description: "Update a Customer",
    body: {
        type: "object",
        required: ["pass", "newName", "newAvatar"],
        properties: {
            pass: { type: "string" },
            newName: { type: "string" },
            newAvatar: { type: "number" }
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
