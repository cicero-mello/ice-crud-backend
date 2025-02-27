import {
    CreateCustomerRepoParams,
    CustomerData,
    CustomerDBRow,
    CustomerRepo,
    GetByIdCustomerRepoParams
} from "#repositories"

export class CustomerRepoInMemory implements CustomerRepo {
    public customers: CustomerDBRow[] = []

    async create({ customer }: CreateCustomerRepoParams) {
        const { name, id, hash, salt, avatar } = customer

        await this.verifyUsernameAvailability(name)
        const alreadyExists = await this.alreadyExists(id)

        if (alreadyExists) {
            throw new Error("Customer Already Exists!")
        }

        this.customers.push({
            id, name, hash, salt, avatar
        })

        return {
            id, name, hash, salt, avatar
        }
    }

    async getById(
        { customerId }: GetByIdCustomerRepoParams
    ): Promise<CustomerData> {
        const alreadyExists = await this.alreadyExists(customerId)

        if (!alreadyExists) {
            throw new Error("Customer Doesn't Exists!")
        }

        const targetCustomer = this.customers.find(
            ({ id }) => id === customerId
        )!

        return {
            avatar: targetCustomer.avatar,
            id: targetCustomer.id,
            name: targetCustomer.name
        }
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
