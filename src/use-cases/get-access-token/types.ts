import { CustomerRepo } from "#repositories"

export interface GetAccessTokenUseCase {
    customerRepo: CustomerRepo
    execute(refreshToken: string): Promise<{ accessToken: string }>
}

export interface GetAccessTokenConstructor {
    customerRepo: CustomerRepo
}
