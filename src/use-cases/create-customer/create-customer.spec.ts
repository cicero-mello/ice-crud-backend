
import * as R from "#repositories/in-memory"
import { test, describe, expect } from "vitest"
import { getError } from "#utils"
import { CreateCustomer } from "."
import { Avatar } from "#enums"

describe("Use Cases || Create Customer", () => {
    test("Create Customers With Valid Values", async () => {
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

        let createdFirst
        try {
            createdFirst = await createCustomer.execute({
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

        expect(createdFirst.customer.name).toEqual("valid-username")
        expect(createdFirst.customer.avatar).toEqual(Avatar.YoungMan)
        expect(createdFirst.customerDBRow.name).toEqual("valid-username")
        expect(createdFirst.customerDBRow.id).toEqual(createdFirst.customer.id)
        expect(createdFirst.customerDBRow.hash).toEqual(createdFirst.customer.hash)
        expect(createdFirst.customerDBRow.salt).toEqual(createdFirst.customer.salt)
        expect(createdFirst.customerDBRow.avatar).toEqual(Avatar.YoungMan)

        expect(customerRepo.customers[0].name).toEqual(createdFirst.customerDBRow.name)
        expect(customerRepo.customers[0].name).toEqual(createdFirst.customer.name)
        expect(customerRepo.customers[0].id).toEqual(createdFirst.customerDBRow.id)
        expect(customerRepo.customers[0].id).toEqual(createdFirst.customer.id)
        expect(customerRepo.customers[0].hash).toEqual(createdFirst.customerDBRow.hash)
        expect(customerRepo.customers[0].hash).toEqual(createdFirst.customer.hash)
        expect(customerRepo.customers[0].salt).toEqual(createdFirst.customerDBRow.salt)
        expect(customerRepo.customers[0].salt).toEqual(createdFirst.customer.salt)
    })

    test("Create Customer With Invalid Value", async () => {
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

    test("Create Customer With Name Already in Use", async () => {
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
            expect(getError(error)).toEqual("This username is already in use")
            return
        }
        expect.fail("Didn't Trigger Error")
    })
})
