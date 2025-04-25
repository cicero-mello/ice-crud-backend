import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest, Repos } from "./types"
import { schema } from "./schema"
import { getError } from "#utils"
import { PreValidation } from "#routes/types"
import { GetIceCream } from "#use-cases/get-ice-cream"
import { GetIceCreamResponse } from "#use-cases/get-ice-cream/types"

export const getIceCream = (
    fastify: FastifyInstance,
    repos: Repos,
    preValidation: PreValidation
) => {
    const URL = "/get-ice-cream"
    const getIceCream = new GetIceCream(repos)

    const get = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        try {
            const { iceCreamId } = request.query
            const data = await getIceCream.execute({
                iceCreamId: iceCreamId
            })

            reply.status(200).send({
                iceCream: {
                    balls: data.iceCream.balls,
                    base: data.iceCream.base,
                    baseType: data.iceCream.baseType,
                    id: data.iceCream.id,
                    name: data.iceCream.name
                }
            } as GetIceCreamResponse)
        } catch (error) {
            reply.status(500).send({ message: getError(error) })
        }
    }

    fastify.get(URL, { schema, preValidation }, get)
}
