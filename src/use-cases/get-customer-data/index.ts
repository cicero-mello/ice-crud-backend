import { CustomerRepo } from "#repositories"
import { zodValidate } from "#utils"
import * as T from "./types"

export class GetCustomerData implements T.GetCustomerDataUseCase {
    public customerRepo: CustomerRepo

    async execute(
        { customerId }: T.GetCustomerDataRequest
    ): Promise<T.GetCustomerDataResponse> {
        zodValidate.id.parse(customerId)

        const customer = await this.customerRepo.getById({ customerId })

        return {
            avatar: customer.avatar,
            id: customer.id,
            name: customer.name
        }
    }

    constructor({ customerRepo }: T.GetCustomerDataUseCaseConstructor) {
        this.customerRepo = customerRepo
    }
}
