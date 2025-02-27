import { CustomerRepo } from "#repositories"
import * as schema from "./schemas"
import * as T from "./types"

export class GetCustomerData implements T.GetCustomerDataUseCase {
    public customerRepo: CustomerRepo

    async execute(
        { customerId }: T.GetCustomerDataRequest
    ): Promise<T.GetCustomerDataResponse> {
        schema.base.parse({ customerId })
        return await this.customerRepo.getById({ customerId })
    }

    constructor({ customerRepo }: T.GetCustomerDataUseCaseConstructor) {
        this.customerRepo = customerRepo
    }
}
