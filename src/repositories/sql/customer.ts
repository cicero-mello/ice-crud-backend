import { prisma } from "#libs/prisma"
import { zodValidate } from "#utils"
import {
    CreateCustomerRepoParams,
    CustomerData,
    CustomerDBRow,
    CustomerRepo,
    CustomerRepoConstructor,
    DeleteCustomerRepoParams,
    GetByIdCustomerRepoParams,
    IceCreamRepo
} from "#repositories"

export class CustomerRepoSQL implements CustomerRepo {
    public iceCreamRepo: IceCreamRepo

    async create({
        customer
    }: CreateCustomerRepoParams): Promise<CustomerDBRow> {
        const { name, id, hash, salt, avatar } = customer

        await prisma.customer.create({
            data: { name, id, hash, salt, avatar }
        })

        return {
            id, name, hash, salt, avatar
        }
    }

    async getById(
        { customerId }: GetByIdCustomerRepoParams
    ): Promise<CustomerData> {
        const targetCustomer = await prisma.customer.findUnique({
            where: { id: customerId }
        })

        if (!targetCustomer) {
            throw new Error("Customer not found!")
        }

        return {
            avatar: targetCustomer.avatar,
            id: targetCustomer.id,
            name: targetCustomer.name
        }
    }

    async usernameIsAvailable(
        username: string
    ): Promise<boolean> {
        const targetCustomer = await prisma.customer.findUnique({
            where: { name: username }
        })

        return !targetCustomer
    }

    async alreadyExists(
        customerId: string
    ): Promise<boolean> {
        const targetCustomer = await prisma.customer.findUnique({
            where: { id: customerId }
        })
        return !!targetCustomer
    }

    async getByName(name: string): Promise<CustomerDBRow> {
        const targetCustomer = await prisma.customer.findUnique({
            where: { name: name }
        })
        if (!targetCustomer) {
            throw new Error("Customer not found!")
        }
        return targetCustomer
    }

    async delete({
        customerId
    }: DeleteCustomerRepoParams): Promise<void> {
        zodValidate.id.parse(customerId)
        await this.getById({ customerId })

        const customerIceCreams = await this.iceCreamRepo.getByCustomer(
            customerId
        )

        await Promise.all(customerIceCreams.map(async (iceCream) =>
            await this.iceCreamRepo.delete({
                iceCreamId: iceCream.id
            })
        ))

        await prisma.customer.delete({
            where: { id: customerId }
        })
    }

    constructor(params: CustomerRepoConstructor){
        this.iceCreamRepo = params.iceCreamRepo
    }
}
