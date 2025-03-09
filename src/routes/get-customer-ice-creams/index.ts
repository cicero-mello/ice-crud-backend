import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest, Repos } from "./types"
import { schema } from "./schema"
import { getCustomerIdFromRequest, getError } from "#utils"
import { GetCustomerIceCreams } from "#use-cases"
import { PreValidation } from "#routes/types"

export const getCustomerIceCreams = (
    fastify: FastifyInstance,
    repos: Repos,
    preValidation: PreValidation
) => {
    const URL = "/get-customer-ice-creams"
    const getCustomerIceCreams = new GetCustomerIceCreams(repos)

    const get = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        try {
            const customerId = getCustomerIdFromRequest(request)
            const data = await getCustomerIceCreams.execute({
                customerId
            })
            reply.status(200).send(data)
        } catch (error) {
            reply.status(500).send({ message: getError(error) })
        }
    }

    fastify.get(URL, { schema, preValidation }, get)
}
