import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest } from "./types"
import { schema } from "./schema"
import { getCustomerIdFromRequest, getError } from "#utils"
import { CustomerLogin } from "#use-cases"
import { CustomerRepo } from "#repositories"
import { PreValidation } from "#routes/types"
import { UpdateCustomerInfo } from "#use-cases/update-customer-info"

export const patchCustomerInfo = (
    fastify: FastifyInstance,
    customerRepo: CustomerRepo,
    preValidation: PreValidation
) => {
    const URL = "/update-customer"
    const customerLogin = new CustomerLogin({
        customerRepo
    })
    const updateCustomerInfo = new UpdateCustomerInfo({
        customerRepo
    })

    const patch = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        try {
            const customerId = getCustomerIdFromRequest(request)
            const { name } = await customerRepo.getById({ customerId })

            await customerLogin.execute({
                name: name,
                pass: request.body.pass
            })

            await updateCustomerInfo.execute({
                avatar: request.body.newAvatar,
                name: request.body.newName,
                id: customerId
            })

            reply.status(200).send({ message: "Customer Updated" })
        } catch (error) {
            reply.status(500).send({ message: getError(error) })
        }
    }

    fastify.patch(URL, { schema, preValidation }, patch)
}
