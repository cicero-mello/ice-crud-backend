import { Customer } from "#entities"
import { Avatar } from "#enums"
import { IceCreamRepo } from "./ice-cream"

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

export interface DeleteCustomerRepoParams {
    customerId: string
}

export interface UpdateCustomerInfoParams {
    customer: Customer
}

export interface CustomerRepo {
    iceCreamRepo: IceCreamRepo
    create(params: CreateCustomerRepoParams): Promise<CustomerDBRow>
    getById(params: GetByIdCustomerRepoParams): Promise<CustomerDBRow>
    getByName(name: string): Promise<CustomerDBRow>
    updateCustomerInfo(params: UpdateCustomerInfoParams): Promise<CustomerDBRow>
    alreadyExists(customerId: string): Promise<boolean>
    usernameIsAvailable(username: string): Promise<boolean>
    delete(params: DeleteCustomerRepoParams): Promise<void>
}

export interface CustomerRepoConstructor {
    iceCreamRepo: IceCreamRepo
}
