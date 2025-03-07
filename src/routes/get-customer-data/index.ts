import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest } from "./types"
import { schema } from "./schema"
import { getError } from "#utils"
import { GetCustomerData } from "#use-cases"
import { CustomerData, CustomerRepo } from "#repositories"

export const getCustomerData = (
    fastify: FastifyInstance,
    customerRepo: CustomerRepo
) => {
    const URL = "/get-customer-data"

    const getCustomerData = new GetCustomerData({
        customerRepo
    })

    const get = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const { customerId } = request.query

        try {
            const data = await getCustomerData.execute({
                customerId
            })
            reply.status(200).send({
                avatar: data.avatar,
                id: data.id,
                name: data.name
            } as CustomerData)
        } catch (error) {
            reply.status(500).send({ message: getError(error) })
        }
    }

    fastify.get(URL, { schema }, get)
}
