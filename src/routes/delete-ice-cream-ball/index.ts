import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest } from "./types"
import { schema } from "./schema"
import { getError } from "#utils"
import { DeleteIceCreamBall } from "#use-cases"
import { IceCreamBallRepo } from "#repositories"
import { PreValidation } from "#routes/types"

export const deleteIceCreamBall = (
    fastify: FastifyInstance,
    iceCreamBallRepo: IceCreamBallRepo,
    preValidation: PreValidation
) => {
    const URL = "/delete-ball"
    const deleteIceCreamBall = new DeleteIceCreamBall({
        iceCreamBallRepo
    })

    const deleteFunc = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const { iceCreamBallId } = request.body

        try {
            await deleteIceCreamBall.execute({
                iceCreamBallId
            })
        } catch (error) {
            reply.status(500).send({ message: getError(error) })
            return
        }

        reply.status(200).send({
            message: "Ball Deleted!"
        })
    }

    fastify.delete(URL, { schema, preValidation }, deleteFunc)
}
