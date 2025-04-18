import { Customer } from "#entities"
import { CustomerRepo } from "#repositories"
import * as T from "./types"

export class UpdateCustomerInfo implements T.UpdateCustomerInfoUseCase {
    public customerRepo: CustomerRepo

    async execute({
        avatar, name, id
    }: T.UpdateCustomerInfoRequest): T.UpdateCustomerInfoResponse {
        const customerDBRow = await this.customerRepo.getById({ customerId: id })
        const customer = new Customer(customerDBRow)

        customer.updateCustomerInfo({
            avatar, name
        })

        const updatedCustomerDBRow = await this.customerRepo.updateCustomerInfo({
            customer
        })

        return {
            customer: customer,
            customerDBRow: updatedCustomerDBRow
        }
    }

    constructor(params: T.UpdateCustomerInfoConstructor) {
        this.customerRepo = params.customerRepo
    }
}
