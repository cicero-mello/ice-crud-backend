import { Avatar } from "#enums"
import { FastifyRequest as FR } from "fastify"

export interface UpdateCustomerInfoRequest {
    newName: string
    newAvatar: Avatar
    pass: string
}

export type FastifyRequest = FR<{
    Body: UpdateCustomerInfoRequest
}>
