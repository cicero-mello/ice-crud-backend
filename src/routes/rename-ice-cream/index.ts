import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest } from "./types"
import { schema } from "./schema"
import { getError } from "#utils"
import { RenameIceCream } from "#use-cases"
import { IceCreamRepo } from "#repositories"

export const patchRenameIceCream = (
    fastify: FastifyInstance,
    iceCreamRepo: IceCreamRepo
) => {
    const URL = "/rename-ice-cream"

    const renameIceCream = new RenameIceCream({
        iceCreamRepo
    })

    const patch = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const { iceCreamId, newIceCreamName } = request.body

        try {
            await renameIceCream.execute({
                iceCreamId,
                newIceCreamName
            })
            reply.status(200).send({ message: "Ice Cream Renamed!" })
        } catch (error) {
            reply.status(500).send({ message: getError(error) })
        }
    }

    fastify.patch(URL, { schema }, patch)
}
