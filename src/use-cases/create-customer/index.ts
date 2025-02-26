import { Customer, CustomerConstructor } from "#entities"
import { CustomerRepo } from "#repositories/customer"

export class CreateCustomer {
    public customerRepo: CustomerRepo

    async execute (customer: CustomerConstructor) {
        const newCustomer = new Customer(customer)
        await this.customerRepo.verifyUsernameAvailability(customer.name)
        await this.customerRepo.addCustomer(newCustomer)
    }

    constructor(repository: CustomerRepo) {
        this.customerRepo = repository
    }
}
