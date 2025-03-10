import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest } from "./types"
import { schema } from "./schema"
import { getCustomerIdFromRequest, getError } from "#utils"
import { CustomerLogin, DeleteCustomer } from "#use-cases"
import { CustomerRepo } from "#repositories"
import { PreValidation } from "#routes/types"

export const deleteCustomer = (
    fastify: FastifyInstance,
    customerRepo: CustomerRepo,
    preValidation: PreValidation
) => {
    const URL = "/delete-customer"
    const customerLogin = new CustomerLogin({
        customerRepo
    })
    const deleteCustomer = new DeleteCustomer({
        customerRepo
    })

    const deleteFunc = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const customerId = getCustomerIdFromRequest(request)

        try {
            await customerLogin.execute({
                name: request.body.name,
                pass: request.body.pass
            })

            await deleteCustomer.execute({
                customerId
            })
        } catch (error) {
            reply.status(500).send({ message: getError(error) })
            return
        }

        reply.status(200).send({
            message: "Customer Deleted!"
        })
    }

    fastify.delete(URL, { schema, preValidation }, deleteFunc)
}
