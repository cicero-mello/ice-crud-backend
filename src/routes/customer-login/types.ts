import { FastifyRequest as FR } from "fastify"

export interface PostCustomerLoginRequest {
    name: string
    pass: string
}

export type FastifyRequest = FR<{
    Body: PostCustomerLoginRequest
}>

export interface PostCustomerLoginResponse {
    message: string
}
