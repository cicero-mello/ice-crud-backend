import { describe, expect, expectTypeOf, test } from "vitest"
import { CustomerRepoInMemory } from "#repositories/in-memory"
import { CreateCustomer } from "#use-cases/create-customer"
import { CustomerData } from "#repositories"
import { getError } from "#utils"
import { Avatar } from "#enums"
import { nanoid } from "nanoid"

describe("Use Cases || GetCustomerData", () => {
    test("Get Data With Valid Customer Id", async () => {
        const customerRepo = new CustomerRepoInMemory()
        const createCustomer = new CreateCustomer({ customerRepo })

        const { customer } = await createCustomer.execute({
            avatar: Avatar.OldBusinessWoman,
            name: "valid-username2",
            pass: "very-valid-password2"
        })

        let customerData
        try {
            customerData = await customerRepo.getById({
                customerId: customer.id
            })
        } catch (error) {
            expect.fail(getError(error))
        }

        expectTypeOf(customer).toMatchTypeOf<CustomerData>()
        expect(customerData.avatar).toEqual(Avatar.OldBusinessWoman)
        expect(customerData.name).toEqual("valid-username2")
        expect(customerData.id).toEqual(customer.id)
    })

    test("Get Data With Invalid Customer Id", async () => {
        const customerRepo = new CustomerRepoInMemory()
        const createCustomer = new CreateCustomer({ customerRepo })

        const { customer } = await createCustomer.execute({
            avatar: Avatar.OldBusinessWoman,
            name: "valid-username2",
            pass: "very-valid-password2"
        })

        const invalidIds = [
            customer.id + "invalid",
            nanoid(),
            "", 1, 0, null, undefined, [], {}, "1"
        ]

        invalidIds.forEach(async (invalidId: any) => {
            try {
                await customerRepo.getById({
                    customerId: invalidId
                })
            } catch (error) {
                expect(!!error).toEqual(true)
                return
            }
            expect.fail("Didn't Trigger Error")
        })
    })
})
