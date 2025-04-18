import { Avatar } from "#enums"
import { CustomerRepo } from "#repositories"

export interface GetCustomerDataRequest {
    customerId: string
}

export interface CustomerData {
    name: string
    avatar: Avatar
    id: string
}

export type GetCustomerDataResponse = CustomerData

export interface GetCustomerDataUseCase {
    customerRepo: CustomerRepo
    execute(
        params: GetCustomerDataRequest
    ): Promise<CustomerData>
}

export interface GetCustomerDataUseCaseConstructor {
    customerRepo: CustomerRepo
}
