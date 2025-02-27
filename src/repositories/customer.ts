import { Customer } from "#entities"
import { Avatar } from "#enums"

export interface CustomerDBRow {
    id: string
    name: string
    hash: string
    salt: string
    avatar: Avatar
}

export interface CreateCustomerRepoParams {
    customer: Customer
}

export interface CustomerRepo {
    customers: CustomerDBRow[]
    create(params: CreateCustomerRepoParams): Promise<CustomerDBRow>
    alreadyExists(customerId: string): Promise<boolean>
}
