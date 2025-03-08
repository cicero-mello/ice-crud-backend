import { prisma } from "#libs/prisma"
import {
    CreateCustomerRepoParams,
    CustomerData,
    CustomerDBRow,
    CustomerRepo,
    GetByIdCustomerRepoParams
} from "#repositories"

export class CustomerRepoSQL implements CustomerRepo {

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

        if(!targetCustomer){
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
        if(!targetCustomer){
            throw new Error("Customer not found!")
        }
        return targetCustomer
    }
}
