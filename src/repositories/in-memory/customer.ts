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

    async usernameIsAvailable(username: string) {
        return !this.customers.find((customer) => (
            customer.name.toLowerCase() === username.toLowerCase()
        ))
    }

    async alreadyExists(customerId: string) {
        return this.customers.some(
            ({ id }) => id === customerId
        )
    }
}
