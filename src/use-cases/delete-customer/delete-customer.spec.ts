import { CreateCustomer } from "#use-cases/create-customer"
import { describe, expect, test } from "vitest"
import * as R from "#repositories/in-memory"
import { Avatar } from "#enums"
import { getError } from "#utils"
import { DeleteCustomer } from "."

describe("Use Cases || DeleteCustomer", () => {
    test("Delete Valid Customer", async () => {
        const iceCreamConeRepo = new R.IceCreamConeRepoInMemory()
        const iceCreamCupRepo = new R.IceCreamCupRepoInMemory()
        const iceCreamBallRepo = new R.IceCreamBallRepoInMemory()
        const iceCreamRepo = new R.IceCreamRepoInMemory({
            iceCreamBallRepo,
            iceCreamConeRepo,
            iceCreamCupRepo
        })
        const customerRepo = new R.CustomerRepoInMemory({ iceCreamRepo })

        const createCustomer = new CreateCustomer({ customerRepo })
        const { customer } = await createCustomer.execute({
            avatar: Avatar.YoungMan,
            name: "Johnny",
            pass: "veryNicePassword"
        })

        try {
            const deleteCustomer = new DeleteCustomer({
                customerRepo
            })

            const preDelete = await customerRepo.getById({ customerId: customer.id })
            expect(!!preDelete).toEqual(true)
            expect(customerRepo.customers.length).toEqual(1)

            await deleteCustomer.execute({
                customerId: customer.id
            })
            expect(customerRepo.customers.length).toEqual(0)
        } catch (error) {
            expect.fail(getError(error))
        }
    })

    test("Delete Inexistent Customer", async () => {
        const iceCreamConeRepo = new R.IceCreamConeRepoInMemory()
        const iceCreamCupRepo = new R.IceCreamCupRepoInMemory()
        const iceCreamBallRepo = new R.IceCreamBallRepoInMemory()
        const iceCreamRepo = new R.IceCreamRepoInMemory({
            iceCreamBallRepo,
            iceCreamConeRepo,
            iceCreamCupRepo
        })
        const customerRepo = new R.CustomerRepoInMemory({ iceCreamRepo })

        try {
            const deleteCustomer = new DeleteCustomer({
                customerRepo
            })

            await deleteCustomer.execute({
                customerId: "invalidId"
            })
        } catch (error) {
            expect(!!error).toEqual(true)
            return
        }
        expect.fail("Didn't Trigger Error")
    })
})
