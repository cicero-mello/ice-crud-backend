import { CustomerRepo } from "#repositories"

export interface DeleteCustomerRequest {
    customerId: string
}

export type DeleteCustomerResponse = Promise<void>

export interface DeleteCustomerUseCase {
    customerRepo: CustomerRepo
    execute(
        params: DeleteCustomerRequest
    ): DeleteCustomerResponse
}

export interface DeleteCustomerUseCaseConstructor {
    customerRepo: CustomerRepo
}
