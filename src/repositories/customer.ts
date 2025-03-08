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

export interface GetByIdCustomerRepoParams {
    customerId: string
}

export interface CustomerData {
    id: string
    name: string
    avatar: Avatar
}

export interface CustomerRepo {
    create(params: CreateCustomerRepoParams): Promise<CustomerDBRow>
    getById(params: GetByIdCustomerRepoParams): Promise<CustomerData>
    getByName(name: string): Promise<CustomerDBRow>
    alreadyExists(customerId: string): Promise<boolean>
    usernameIsAvailable(username: string): Promise<boolean>
}
