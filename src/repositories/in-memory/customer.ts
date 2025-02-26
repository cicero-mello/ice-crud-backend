import { Customer } from "#entities"
import {
    CustomerDBRow,
    CustomerRepo
} from "#repositories"

export class CustomerRepoInMemory implements CustomerRepo {
    public customers: CustomerDBRow[] = []

    async create({
        id, name, pass, salt, avatar
    }: Customer) {
        await this.verifyUsernameAvailability(name)
        const alreadyExists = await this.alreadyExists(id)

        if (alreadyExists) {
            throw new Error("Customer Already Exists!")
        }

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

    async alreadyExists(customerId: string) {
        return this.customers.some(
            ({ id }) => id === customerId
        )
    }
}
