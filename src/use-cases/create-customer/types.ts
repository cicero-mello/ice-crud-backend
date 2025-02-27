import { Customer, CustomerConstructor } from "#entities"
import { CustomerDBRow, CustomerRepo } from "#repositories"

export type CreateCustomerRequest = CustomerConstructor
export type CreateCustomerResponse = Promise<{
    customer: Customer
    customerDBRow: CustomerDBRow
}>

export interface CreateCustomerUseCase {
    customerRepo: CustomerRepo
    execute(
        customer: CreateCustomerRequest
    ): CreateCustomerResponse
}

export interface CreateCustomerConstructor {
    customerRepo: CustomerRepo
}
