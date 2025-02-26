import { CustomerRepo } from "#repositories/customer"
import { Customer } from "#entities"

export class CustomerRepoInMemory implements CustomerRepo {
    public customers: Customer[] = []

    async addCustomer(customer: Customer) {
        this.customers.push(customer)
    }

    async verifyUsernameAvailability(username: string) {
        const isUsernameInUse = (
            this.customers.find((customer) => (
                customer.name.toLowerCase() === username.toLowerCase()
            ))
        )

        if (isUsernameInUse) {
            throw new Error("The username is already in use")
        }
    }
}
