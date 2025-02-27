import { CustomerRepo } from "#repositories"
import { Customer } from "#entities"
import * as T from "./types"

export class CreateCustomer implements T.CreateCustomerUseCase {
    public customerRepo: CustomerRepo

    async execute (customer: T.CreateCustomerRequest) {
        const newCustomer = new Customer(customer)
        const customerDBRow = await this.customerRepo.create({
            customer: newCustomer
        })
        return {
            customer: newCustomer,
            customerDBRow: customerDBRow
        }
    }

    constructor(params: T.CreateCustomerConstructor) {
        this.customerRepo = params.customerRepo
    }
}
