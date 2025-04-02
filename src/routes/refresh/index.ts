import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest } from "./types"
import { schema } from "./schema"
import { getError } from "#utils"
import { GetAccessToken } from "#use-cases"
import {  CustomerRepo } from "#repositories"

export const refresh = (
    fastify: FastifyInstance,
    customerRepo: CustomerRepo
) => {
    const URL = "/refresh"

    const getAccessToken = new GetAccessToken({
        customerRepo
    })

    const get = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        try {
            const { accessToken } = await getAccessToken.execute({
                refreshToken: request.cookies.refresh_token as string
            })
            reply.setCookie("access_token", accessToken, {
                httpOnly: true,
                path: "/"
            })
            reply.status(200).send({ message: "Your Access Token was Updated!" })
        } catch (error) {
            reply.status(500).send({ message: getError(error) })
        }
    }

    fastify.get(URL, { schema }, get)
}
