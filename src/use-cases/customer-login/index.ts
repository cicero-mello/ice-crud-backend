import { CustomerRepo } from "#repositories"
import { generateHash } from "#utils/crypto"
import jwt from "jsonwebtoken"
import * as T from "./types"
import * as schema from "./schemas"

export class CustomerLogin implements T.CustomerLoginUseCase {
    public customerRepo: CustomerRepo

    async execute(
        { name, pass }: T.CustomerLoginRequest
    ): Promise<T.CustomerLoginResponse> {
        schema.base.parse({ name, pass })

        const { id, hash, salt } = await this.customerRepo.getByName(name)
        await this.verifyHash(pass, hash, salt)

        const accessToken = jwt.sign(
            { customerId: id },
            process.env.ACCESS_TOKEN_SECRET_KEY!,
            { expiresIn: '15m' }
        )

        const refreshToken = jwt.sign(
            { customerId: id },
            process.env.REFRESH_TOKEN_SECRET_KEY!,
            { expiresIn: '7d' }
        )

        if (!accessToken || !refreshToken) {
            throw new Error("Unexpected Error in Token Generation")
        }

        return {
            accessToken,
            refreshToken
        }
    }

    private async verifyHash(
        password: string,
        hash: string, salt: string
    ) {
        const loginHash = generateHash(password, salt)

        if (loginHash != hash) {
            throw new Error("Invalid Password!")
        }
    }

    constructor(params: T.CustomerLoginConstructor) {
        this.customerRepo = params.customerRepo
    }
}
