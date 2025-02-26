
import { test, describe, expect } from "vitest"
import { getError } from "#utils"
import { CreateCustomer } from "."
import { Avatar } from "#enums"
import { CustomerRepoInMemory } from "#repositories/in-memory"

describe("Create Customer", () => {
    test("Create Customers With Valid Values", async () => {
        const customerRepo = new CustomerRepoInMemory()
        const createCustomer = new CreateCustomer(customerRepo)

        try {
            await createCustomer.execute({
                avatar: Avatar.YoungMan,
                name: "valid-username",
                pass: "very-valid-password"
            })
            await createCustomer.execute({
                avatar: Avatar.AsianYoungWoman,
                name: "valid-username2",
                pass: "very-valid-password2"
            })
        } catch (error) {
            expect.fail(getError(error))
        }

        expect(customerRepo.customers).toHaveLength(2)
        expect(customerRepo.customers[0].name).toEqual("valid-username")
        expect(customerRepo.customers[1].name).toEqual("valid-username2")
    })

    test("Create Customer With Invalid Value", async () => {
        const customerRepo = new CustomerRepoInMemory()
        const createCustomer = new CreateCustomer(customerRepo)

        try {
            await createCustomer.execute({
                avatar: "Avatar.YoungMan" as any,
                name: "valid-username2",
                pass: "very-valid-password2"
            })
        } catch (error) {
            expect(!!error).toEqual(true)
            expect(getError(error)).toEqual("Invalid Avatar")
            expect(customerRepo.customers).toHaveLength(0)
            return
        }
        expect.fail("Didn't Trigger Error")
    })

    test("Create Customer With Already Name Already in Use", async () => {
        const customerRepo = new CustomerRepoInMemory()
        const createCustomer = new CreateCustomer(customerRepo)

        try {
            await createCustomer.execute({
                avatar: Avatar.YoungMan,
                name: "valid-username",
                pass: "very-valid-password"
            })
            await createCustomer.execute({
                avatar: Avatar.AsianYoungWoman,
                name: "valid-username",
                pass: "very-valid-password2"
            })
        } catch (error) {
            expect(customerRepo.customers).toHaveLength(1)
            expect(getError(error)).toEqual("The username is already in use")
            return
        }
        expect.fail("Didn't Trigger Error")
    })
})
