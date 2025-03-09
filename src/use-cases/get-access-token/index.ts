import { CustomerRepo } from "#repositories"
import { zodValidate } from "#utils"
import * as T from "./types"
import jwt from "jsonwebtoken"

export class GetAccessToken implements T.GetAccessTokenUseCase {
    public customerRepo: CustomerRepo

    async execute(
        { refreshToken }: T.GetAccessTokenRequest
    ): Promise<T.GetAccessTokenResponse> {
        zodValidate.refreshToken.parse(refreshToken)

        const decoded = jwt.verify(
            refreshToken as string,
            process.env.REFRESH_TOKEN_SECRET_KEY!
        ) as any

        await this.validateCustomerId(decoded.customerId)

        const accessToken = jwt.sign(
            { customerId: decoded.customerId },
            process.env.ACCESS_TOKEN_SECRET_KEY!,
            { expiresIn: process.env.ACCESS_TOKEN_DURATION! as any }
        )

        return { accessToken }
    }

    private async validateCustomerId(customerId: string) {
        const customerExists = await this.customerRepo.alreadyExists(
            customerId
        )
        if (!customerExists) {
            throw new Error("This Costumer Doesn't Exists!")
        }
    }

    constructor(params: T.GetAccessTokenConstructor) {
        this.customerRepo = params.customerRepo
    }
}
