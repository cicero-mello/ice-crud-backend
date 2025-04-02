import { FastifyInstance, FastifyReply } from "fastify"
import { CustomerRepo } from "#repositories"
import { CustomerLogin } from "#use-cases"
import { FastifyRequest } from "./types"
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
            reply.setCookie('access_token', tokens.accessToken, {
                httpOnly: true,
                path: '/',
            })
            reply.setCookie('refresh_token', tokens.refreshToken, {
                httpOnly: true,
                path: '/'
            })
            reply.status(200).send({ message: "You Are Logged" })
        } catch (error) {
             reply.status(500).send({ message: getError(error) })
        }
    }

    fastify.post(URL, { schema }, post)
}
