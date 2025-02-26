import { Customer } from "#entities"
import { Avatar } from "#enums"

export interface CustomerDBRow {
    id: string
    name: string
    pass: string
    salt: string
    avatar: Avatar
}

export interface CustomerRepo {
    customers: CustomerDBRow[]
    create(customer: Customer): Promise<void>
}
