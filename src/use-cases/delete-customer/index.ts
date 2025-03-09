import { CustomerRepo } from "#repositories"
import * as T from "./types"
import { zodValidate } from "#utils"

export class DeleteCustomer implements T.DeleteCustomerUseCase {
    public customerRepo: CustomerRepo

    async execute({ customerId }: T.DeleteCustomerRequest) {
        zodValidate.id.parse(customerId)
        this.customerRepo.delete({ customerId })
    }

    constructor(params: T.DeleteCustomerUseCaseConstructor){
        this.customerRepo = params.customerRepo
    }
}
