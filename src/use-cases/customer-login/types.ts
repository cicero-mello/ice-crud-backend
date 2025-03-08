import { CustomerRepo } from "#repositories"

export interface CustomerLoginRequest {
    name: string
    pass: string
}

export interface CustomerLoginResponse {
    accessToken: string
    refreshToken: string
}

export interface CustomerLoginUseCase {
    customerRepo: CustomerRepo
    execute(
        params: CustomerLoginRequest
    ): Promise<CustomerLoginResponse>
}

export interface CustomerLoginConstructor {
    customerRepo: CustomerRepo
}
