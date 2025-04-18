import {
    CreateCustomerRepoParams,
    CustomerDBRow,
    CustomerRepo,
    CustomerRepoConstructor,
    DeleteCustomerRepoParams,
    GetByIdCustomerRepoParams,
    IceCreamRepo,
    UpdateCustomerInfoParams
} from "#repositories"

export class CustomerRepoInMemory implements CustomerRepo {
    public iceCreamRepo: IceCreamRepo
    public customers: CustomerDBRow[] = []

    async create({
        customer
    }: CreateCustomerRepoParams): Promise<CustomerDBRow> {
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
    ): Promise<CustomerDBRow> {
        const targetCustomer = this.customers.find(
            ({ id }) => id === customerId
        )

        if (!targetCustomer) {
            throw new Error("Customer not found!")
        }

        return {
            avatar: targetCustomer.avatar,
            id: targetCustomer.id,
            name: targetCustomer.name,
            hash: targetCustomer.hash,
            salt: targetCustomer.salt
        }
    }

    async updateCustomerInfo({
        customer
    }: UpdateCustomerInfoParams): Promise<CustomerDBRow> {
        const targetCustomer = this.customers.find(
            ({ id }) => id === customer.id
        )

        if (!targetCustomer) {
            throw new Error("Customer not found!")
        }

        targetCustomer.avatar = customer.avatar
        targetCustomer.name = customer.name

        return targetCustomer
    }

    async usernameIsAvailable(
        username: string
    ): Promise<boolean> {
        return !this.customers.find((customer) => (
            customer.name.toLowerCase() === username.toLowerCase()
        ))
    }

    async alreadyExists(
        customerId: string
    ): Promise<boolean> {
        return this.customers.some(
            ({ id }) => id === customerId
        )
    }

    async getByName(name: string): Promise<CustomerDBRow> {
        const targetCustomer = this.customers.find(
            (customer) => customer.name === name
        )
        if (!targetCustomer) {
            throw new Error("Customer not found!")
        }
        return targetCustomer
    }

    async delete({
        customerId
    }: DeleteCustomerRepoParams): Promise<void> {
        const index = this.customers.findIndex(
            ({ id }) => id === customerId
        )
        if (index === -1) {
            throw new Error("This id does not match an existing Customer!")
        }
        this.customers.splice(index, 1)
    }

    constructor(params: CustomerRepoConstructor) {
        this.iceCreamRepo = params.iceCreamRepo
    }
}
