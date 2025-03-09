import { CustomerRepo } from "#repositories"

export interface GetAccessTokenRequest {
    refreshToken: string
}

export interface GetAccessTokenResponse {
    accessToken: string
}

export interface GetAccessTokenUseCase {
    customerRepo: CustomerRepo
    execute(params: GetAccessTokenRequest): Promise<GetAccessTokenResponse>
}

export interface GetAccessTokenConstructor {
    customerRepo: CustomerRepo
}
