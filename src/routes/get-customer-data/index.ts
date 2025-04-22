import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest } from "./types"
import { schema } from "./schema"
import { getCustomerIdFromRequest, getError } from "#utils"
import { CustomerData, GetCustomerData } from "#use-cases"
import { CustomerRepo } from "#repositories"
import { PreValidation } from "#routes/types"

export const getCustomerData = (
    fastify: FastifyInstance,
    customerRepo: CustomerRepo,
    preValidation: PreValidation
) => {
    const URL = "/get-customer-data"

    const getCustomerData = new GetCustomerData({
        customerRepo
    })

    const get = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        try {
            const customerId = getCustomerIdFromRequest(request)
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

    fastify.get(URL, { schema, preValidation }, get)
}
