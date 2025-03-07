import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest } from "./types"
import { schema } from "./schema"
import { getError } from "#utils"
import { DeleteIceCream } from "#use-cases"
import { IceCreamRepo } from "#repositories"

export const deleteIceCream = (
    fastify: FastifyInstance,
    iceCreamRepo: IceCreamRepo
) => {
    const URL = "/delete-ice-cream"
    const deleteIceCream = new DeleteIceCream({
        iceCreamRepo
    })

    const deleteFunc = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const { iceCreamId } = request.body

        try {
            await deleteIceCream.execute({
                iceCreamId
            })
        } catch (error) {
            reply.status(500).send({ message: getError(error) })
            return
        }

        reply.status(200).send({
            message: "Ice Cream Deleted!"
        })
    }

    fastify.delete(URL, { schema }, deleteFunc)
}
