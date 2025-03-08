import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest, Repos } from "./types"
import { schema } from "./schema"
import { getError } from "#utils"
import { GetCustomerIceCreams } from "#use-cases"

export const getCustomerIceCreams = (
    fastify: FastifyInstance,
    repos: Repos
) => {
    const URL = "/get-customer-ice-creams"
    const getCustomerIceCreams = new GetCustomerIceCreams(repos)

    const get = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const { customerId } = request.query

        try {
            const data = await getCustomerIceCreams.execute({
                customerId
            })
            reply.status(200).send(data)
        } catch (error) {
            reply.status(500).send({ message: getError(error) })
        }
    }

    fastify.get(URL, { schema }, get)
}
