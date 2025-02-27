import { CustomerRepo } from "#repositories"
import { Customer } from "#entities"
import * as T from "./types"

export class CreateCustomer implements T.CreateCustomerUseCase {
    public customerRepo: CustomerRepo

    async execute (customer: T.CreateCustomerRequest) {
        const newCustomer = new Customer(customer)
        await this.validateCustomer(newCustomer)

        const customerDBRow = await this.customerRepo.create({
            customer: newCustomer
        })
        return {
            customer: newCustomer,
            customerDBRow: customerDBRow
        }
    }

    private async validateCustomer(customer: Customer){
        const customerAlreadyExists = await this.customerRepo.alreadyExists(
            customer.id
        )
        if (customerAlreadyExists) {
            throw new Error("Customer Already Exists!")
        }

        const usernameAvailable = await this.customerRepo.usernameIsAvailable(
            customer.name
        )
        if (!usernameAvailable) {
            throw new Error("This username is already in use")
        }
    }

    constructor(params: T.CreateCustomerConstructor) {
        this.customerRepo = params.customerRepo
    }
}
