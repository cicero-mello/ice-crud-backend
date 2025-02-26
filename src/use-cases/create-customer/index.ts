import { Customer, CustomerConstructor } from "#entities"
import { CustomerRepo } from "#repositories/customer"

export class CreateCustomer {
    public customerRepo: CustomerRepo

    async execute (customer: CustomerConstructor) {
        const newCustomer = new Customer(customer)
        await this.customerRepo.create(newCustomer)
    }

    constructor(repository: CustomerRepo) {
        this.customerRepo = repository
    }
}
