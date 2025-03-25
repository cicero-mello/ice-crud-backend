import { CustomerRepo } from "#repositories"
import { Customer } from "#entities"
import jwt from "jsonwebtoken"
import * as T from "./types"

export class CreateCustomer implements T.CreateCustomerUseCase {
    public customerRepo: CustomerRepo

    async execute(customer: T.CreateCustomerRequest) {
        const newCustomer = new Customer(customer)
        await this.validateCustomer(newCustomer)

        const customerDBRow = await this.customerRepo.create({
            customer: newCustomer
        })

        const accessToken = jwt.sign(
            { customerId: newCustomer.id },
            process.env.ACCESS_TOKEN_SECRET_KEY!,
            { expiresIn: process.env.ACCESS_TOKEN_DURATION! as any }
        )

        const refreshToken = jwt.sign(
            { customerId: newCustomer.id },
            process.env.REFRESH_TOKEN_SECRET_KEY!,
            { expiresIn: process.env.REFRESH_TOKEN_DURATION! as any }
        )

        if (!accessToken || !refreshToken) {
            throw new Error("Unexpected Error in Token Generation")
        }

        return {
            customer: newCustomer,
            customerDBRow: customerDBRow,
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }

    private async validateCustomer(customer: Customer) {
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
