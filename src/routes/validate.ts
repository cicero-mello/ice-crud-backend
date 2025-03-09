import { CustomerRepo } from "#repositories"
import { getCustomerIdFromRequest, getError } from "#utils"
import { FastifyReply, FastifyRequest } from "fastify"

export const getValidateCustomer = (customerRepo: CustomerRepo) => async (
    request: FastifyRequest, reply: FastifyReply
) => {
    try {
        const customerId = getCustomerIdFromRequest(request)
        const customerExists = await customerRepo.alreadyExists(customerId)
        if (!customerExists) {
            reply.status(401).send({
                statusCode: 401,
                error: `Unauthorized`,
                message: "Invalid/Expired AccessToken!"
            })
        }
        return
    } catch (error) {
        reply.status(401).send({
            statusCode: 401,
            error: `Unauthorized: ${getError(error)}`,
            message: "Invalid/Expired AccessToken!"
        })
        return
    }
}
