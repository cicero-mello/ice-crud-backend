import { CustomerData, CustomerRepo } from "#repositories"

export interface GetCustomerDataRequest {
    customerId: string
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
