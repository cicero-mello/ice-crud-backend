import { describe, expect, test } from "vitest"
import * as R from "#repositories/in-memory"
import { CreateCustomer } from "#use-cases/create-customer"
import { Avatar } from "#enums"
import { UpdateCustomerInfo } from "."
import { getError } from "#utils"
import { nanoid } from "nanoid"

describe("Use Cases || UpdateCustomerInfo", () => {
    test("Update With Valid Values", async () => {
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

        const oldName = "velho"
        const oldAvatar = Avatar.OldBusinessMan

        const { customer, customerDBRow } = await createCustomer.execute({
            avatar: oldAvatar,
            name: oldName,
            pass: "very-valid-password3"
        })

        const oldHash = customer.hash
        const id = customer.id
        const salt = customer.salt

        expect(customer.name).toEqual(oldName)
        expect(customer.avatar).toEqual(oldAvatar)
        expect(customerDBRow.name).toEqual(oldName)
        expect(customerDBRow.avatar).toEqual(oldAvatar)
        expect(customerDBRow.hash).toEqual(oldHash)
        expect(customerDBRow.id).toEqual(id)
        expect(customerDBRow.salt).toEqual(salt)

        const newAvatar = Avatar.YoungMan
        const newName = "novo"

        try {
            const updateCustomerInfo = new UpdateCustomerInfo({ customerRepo })
            const updated = await updateCustomerInfo.execute({
                avatar: newAvatar,
                name: newName,
                id: id
            })

            expect(updated.customer.name).toEqual(newName)
            expect(updated.customer.avatar).toEqual(newAvatar)
            expect(updated.customerDBRow.name).toEqual(newName)
            expect(updated.customerDBRow.avatar).toEqual(newAvatar)
            expect(updated.customerDBRow.id).toEqual(id)

        } catch (error) {
            expect.fail(getError(error))
        }
    }),
        test("Update With Invalid Values", async () => {
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

            const oldName = "velho"
            const oldAvatar = Avatar.OldBusinessMan

            const { customer, customerDBRow } = await createCustomer.execute({
                avatar: oldAvatar,
                name: oldName,
                pass: "very-valid-password3"
            })

            const id = customer.id

            expect(customer.name).toEqual(oldName)
            expect(customer.avatar).toEqual(oldAvatar)
            expect(customerDBRow.name).toEqual(oldName)
            expect(customerDBRow.avatar).toEqual(oldAvatar)
            expect(customerDBRow.id).toEqual(id)

            const newAvatar = Avatar.YoungMan
            const newName = "novo"

            const notFoundId = nanoid()

            try {
                const updateCustomerInfo = new UpdateCustomerInfo({ customerRepo })
                await updateCustomerInfo.execute({
                    avatar: newAvatar,
                    name: newName,
                    id: notFoundId
                })
            } catch (error) {
                expect(!!error).toEqual(true)
                return
            }
            expect.fail("Didn't Trigger Error")
        })
})
