import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest, Repos } from "./types"
import { schema } from "./schema"
import { getError } from "#utils"
import { UpdateIceCreamBase } from "#use-cases"
import { IceCreamBaseType } from "#enums"
import * as E from "#entities"
import { PreValidation } from "#routes/types"

export const patchUpdateIceCreamBase = (
    fastify: FastifyInstance,
    repos: Repos,
    preValidation: PreValidation
) => {
    const URL = "/update-ice-cream-base"

    const updateIceCreamBase = new UpdateIceCreamBase(repos)

    const patch = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const { iceCreamId, baseType, base } = request.body
        try {
            let newBase: E.IceCreamCone | E.IceCreamCup
            if (baseType === IceCreamBaseType.Cone) {
                newBase = new E.IceCreamCone(base as E.IceCreamConeProps)
            }
            else {
                newBase = new E.IceCreamCup(base as E.IceCreamCupProps)
            }

            await updateIceCreamBase.execute({
                iceCreamId,
                base: newBase
            })
            reply.status(200).send({ message: "Ice Cream Base Updated!" })
        } catch (error) {
            reply.status(500).send({ message: getError(error) })
        }
    }

    fastify.patch(URL, { schema, preValidation }, patch)
}
