import { Customer } from "#entities"

export interface CustomerRepo {
    customers: Customer[]
    addCustomer(customer: Customer): Promise<void>
    verifyUsernameAvailability(username: string): Promise<void>
}
