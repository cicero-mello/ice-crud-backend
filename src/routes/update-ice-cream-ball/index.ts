import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest, Repos } from "./types"
import { schema } from "./schema"
import { getError } from "#utils"
import { UpdateIceCreamBall } from "#use-cases"
import { IceCreamBall } from "#entities"
import { PreValidation } from "#routes/types"

export const patchUpdateIceCreamBall = (
    fastify: FastifyInstance,
    repos: Repos,
    preValidation: PreValidation
) => {
    const URL = "/update-ice-cream-ball"

    const updateIceCreamBall = new UpdateIceCreamBall(repos)

    const patch = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const { iceCreamId, ball } = request.body
        try {
            const newBall = new IceCreamBall({
                id: ball.id,
                flavor: ball.flavor,
                size: ball.size
            })
            await updateIceCreamBall.execute({
                iceCreamId,
                iceCreamBall: newBall
            })
            reply.status(200).send({ message: "Ice Cream Ball Updated!" })
        } catch (error) {
            reply.status(500).send({ message: getError(error) })
        }
    }

    fastify.patch(URL, { schema, preValidation }, patch)
}
