import { FastifyInstance, FastifyReply } from "fastify"
import { AddIceCreamBall, } from "#use-cases"
import { FastifyRequest, Repos } from "./types"
import { schema } from "./schema"
import { getError } from "#utils"
import { IceCreamBall } from "#entities"
import { PreValidation } from "#routes/types"

export const postAddIceCreamBall = (
    fastify: FastifyInstance,
    { iceCreamBallRepo, iceCreamRepo }: Repos,
    preValidation: PreValidation
) => {
    const URL = "/add-ball"
    const addIceCreamBall = new AddIceCreamBall({
        iceCreamBallRepo,
        iceCreamRepo
    })

    const post = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const { iceCreamId, ball } = request.body

        try {
            const iceCreamBall = new IceCreamBall({
                flavor: ball.flavor,
                size: ball.size
            })

            await addIceCreamBall.execute({
                iceCreamId, iceCreamBall
            })
        } catch (error) {
            reply.status(500).send({ message: getError(error) })
            return
        }

        reply.status(201).send({
            message: "Ball Added!"
        })
    }

    fastify.post(URL, { schema, preValidation }, post)
}
