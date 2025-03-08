import { CustomerRepo } from "#repositories"
import { CustomerLogin } from "#use-cases"
import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest, PostCustomerLoginResponse } from "./types"
import { getError } from "#utils"
import { schema } from "./schema"

export const postCustomerLogin = (
    fastify: FastifyInstance,
    customerRepo: CustomerRepo
) => {
    const URL = "/customer-login"
    const customerLogin = new CustomerLogin({
        customerRepo
    })

    const post = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const { name, pass } = request.body

        try {
            const tokens = await customerLogin.execute({
                name, pass
            })
            reply.status(200).send({
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            } as PostCustomerLoginResponse)
        } catch (error) {
             reply.status(500).send({ message: getError(error) })
        }
    }

    fastify.post(URL, { schema }, post)
}
