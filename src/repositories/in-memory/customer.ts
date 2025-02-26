import { CustomerDBRow, CustomerRepo } from "#repositories/customer"
import { Customer } from "#entities"

export class CustomerRepoInMemory implements CustomerRepo {
    public customers: CustomerDBRow[] = []

    async create({
        id, name, pass, salt, avatar
    }: Customer) {
        await this.verifyCustomerAlreadyExists(id)
        await this.verifyUsernameAvailability(name)

        this.customers.push({
            id, name, pass, salt, avatar
        })
    }

    private async verifyUsernameAvailability(username: string) {
        const isUsernameInUse = (
            this.customers.find((customer) => (
                customer.name.toLowerCase() === username.toLowerCase()
            ))
        )

        if (isUsernameInUse) {
            throw new Error("The username is already in use")
        }
    }

    private async verifyCustomerAlreadyExists (id: string) {
        const customerAlreadyExists = (
            this.customers.some((customer) => customer.id === id)
        )

        if(customerAlreadyExists) {
            throw new Error("Customer Already Exists!")
        }
    }
}
