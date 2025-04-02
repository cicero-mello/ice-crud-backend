import { FastifyInstance, FastifyReply } from "fastify"
import { CustomerRepo } from "#repositories"
import { CreateCustomer } from "#use-cases"
import { FastifyRequest } from "./types"
import { schema } from "./schema"
import { getError } from "#utils"

export const postCreateCustomer = (
    fastify: FastifyInstance,
    customerRepo: CustomerRepo
) => {
    const URL = "/create-customer"
    const createCustomer = new CreateCustomer({ customerRepo })

    const post = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const { name, avatar, pass } = request.body

        try {
            const {
                refreshToken,
                accessToken
            } = await createCustomer.execute({ avatar, name, pass })

            reply.setCookie('access_token', accessToken, {
                httpOnly: true,
                path: '/'
            })

            reply.setCookie('refresh_token', refreshToken, {
                httpOnly: true,
                path: '/'
            })

            reply.status(201).send({ message: "Customer Created! You are Logged." })
        } catch (error) {
            reply.status(500).send({ message: getError(error) })
            return
        }
    }

    fastify.post(URL, { schema }, post)
}
