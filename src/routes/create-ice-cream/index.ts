import { IceCreamBall, IceCreamCone, IceCreamCup } from "#entities"
import { FastifyInstance, FastifyReply } from "fastify"
import { CreateIceCream } from "#use-cases"
import { FastifyRequest, Repos } from "./types"
import { schema } from "./schema"
import { getCustomerIdFromRequest, getError } from "#utils"
import { PreValidation } from "#routes/types"

export const postCreateIceCream = (
    fastify: FastifyInstance,
    repos: Repos,
    preValidation: PreValidation
) => {
    const URL = "/create-ice-cream"
    const createIceCream = new CreateIceCream(repos)

    const post = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const { name, balls, cone, cup } = request.body

        if(!cone && !cup){
            reply.status(500).send({ message: "Need to have a 'cone' or a 'cup'!" })
            return
        }

        try {
            const iceCreamBalls = balls.map((ball) => (
                new IceCreamBall(ball)
            ))
            const base = cone ? new IceCreamCone(cone) : new IceCreamCup(cup!)
            const customerId = getCustomerIdFromRequest(request)

            await createIceCream.execute({
                customerId: customerId,
                iceCream: {
                    balls: iceCreamBalls,
                    base: base,
                    name: name,
                }
            })
        } catch (error) {
            reply.status(500).send({ message: getError(error) })
            return
        }

        reply.status(201).send({
            message: "Ice Cream Created"
        })
    }

    fastify.post(URL, { schema, preValidation }, post)
}
