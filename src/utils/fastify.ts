import { zodValidate } from "#utils"
import { FastifyRequest } from "fastify"
import jwt from "jsonwebtoken"

export const getCustomerIdFromRequest = (request: FastifyRequest): string => {
    const accessToken = request.cookies.access_token
    zodValidate.accessToken.parse(accessToken)

    const decoded = jwt.verify(
        accessToken as string,
        process.env.ACCESS_TOKEN_SECRET_KEY!
    ) as any

    return decoded.customerId as string
}
