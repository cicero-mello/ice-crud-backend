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
            await createCustomer.execute({ avatar, name, pass })
        } catch (error) {
            reply.status(500).send({ message: getError(error) })
            return
        }

        reply.status(201).send({
            message: "Customer Created"
        })
    }

    fastify.post(URL, { schema }, post)
}
