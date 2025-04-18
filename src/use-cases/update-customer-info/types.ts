import { Customer } from "#entities"
import { Avatar } from "#enums"
import { CustomerDBRow, CustomerRepo } from "#repositories"

export interface UpdateCustomerInfoRequest {
    name: string
    avatar: Avatar
    id: string
}

export type UpdateCustomerInfoResponse = Promise<{
    customer: Customer
    customerDBRow: CustomerDBRow
}>

export interface UpdateCustomerInfoUseCase {
    customerRepo: CustomerRepo
    execute(
        params: UpdateCustomerInfoRequest
    ): UpdateCustomerInfoResponse
}

export interface UpdateCustomerInfoConstructor {
    customerRepo: CustomerRepo
}
