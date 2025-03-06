import { Avatar } from "#enums"
import { FastifyRequest as FR } from "fastify"

export interface CreateCustomerRequest {
    name: string
    avatar: Avatar
    pass: string
}

export type FastifyRequest = FR<{
    Body: CreateCustomerRequest
}>
