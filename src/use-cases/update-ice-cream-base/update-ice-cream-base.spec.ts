import { describe, expect, test } from "vitest"
import * as R from "#repositories/in-memory"
import { CreateCustomer } from "#use-cases/create-customer"
import { Avatar, Size } from "#enums"
import { CreateIceCream } from "#use-cases/create-ice-cream"
import { IceCream, IceCreamCone, IceCreamCup } from "#entities"
import { UpdateIceCreamBase } from "."
import { getError } from "#utils"
import { nanoid } from "nanoid"

describe("Use Cases || UpdateIceCreamBase", () => {
    test("Update With Valid/Invalid Values", async () => {
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

        const createIceCream = new CreateIceCream({
            iceCreamBallRepo,
            iceCreamConeRepo,
            iceCreamCupRepo,
            iceCreamRepo,
            customerRepo
        })

        const cup1 = new IceCreamCup({ size: Size.medium })
        const cup2 = new IceCreamCup({ size: Size.big })
        const cone = new IceCreamCone({ size: Size.small, color: "#FFFFFF"})

        const iceCream = new IceCream({
            name: "First Ice Cream Name",
            base: cup1,
            balls: []
        })

        await createIceCream.execute({
            customerId: customer.id,
            iceCream: iceCream
        })

        expect(iceCreamCupRepo.iceCreamCups).toHaveLength(1)
        expect(iceCreamCupRepo.iceCreamCups[0].size).toEqual(cup1.size)
        expect(iceCreamCupRepo.iceCreamCups[0].id).toEqual(cup1.id)

        // Valid ----------------------------------------------------------
        try {
            const updateIceCreamBase = new UpdateIceCreamBase({
                iceCreamConeRepo,
                iceCreamCupRepo,
                iceCreamRepo
            })
            await updateIceCreamBase.execute({
                base: cup2,
                iceCreamId: iceCream.id
            })

            expect(iceCreamConeRepo.iceCreamCones).toHaveLength(0)
            expect(iceCreamCupRepo.iceCreamCups).toHaveLength(1)
            expect(iceCreamCupRepo.iceCreamCups[0].size).toEqual(cup2.size)
            expect(iceCreamCupRepo.iceCreamCups[0].id).toEqual(cup2.id)

            await updateIceCreamBase.execute({
                base: cone,
                iceCreamId: iceCream.id
            })

            expect(iceCreamCupRepo.iceCreamCups).toHaveLength(0)
            expect(iceCreamConeRepo.iceCreamCones).toHaveLength(1)
            expect(iceCreamConeRepo.iceCreamCones[0].size).toEqual(cone.size)
            expect(iceCreamConeRepo.iceCreamCones[0].id).toEqual(cone.id)
            expect(iceCreamConeRepo.iceCreamCones[0].color).toEqual(cone.color)

            await updateIceCreamBase.execute({
                base: cup1,
                iceCreamId: iceCream.id
            })

            expect(iceCreamCupRepo.iceCreamCups).toHaveLength(1)
            expect(iceCreamConeRepo.iceCreamCones).toHaveLength(0)
            expect(iceCreamCupRepo.iceCreamCups[0].size).toEqual(cup1.size)
            expect(iceCreamCupRepo.iceCreamCups[0].id).toEqual(cup1.id)
        } catch (error) {
            expect.fail(getError(error))
        }
        // ----------------------------------------------------------------

        // Invalid --------------------------------------------------------
        try {
            const updateIceCreamBase = new UpdateIceCreamBase({
                iceCreamConeRepo,
                iceCreamCupRepo,
                iceCreamRepo
            })
            await updateIceCreamBase.execute({
                base: cup2,
                iceCreamId: nanoid()
            })
            expect.fail("Didn't Trigger Error")
        } catch (error) {
            expect(!!error).toEqual(true)
        }
        // ----------------------------------------------------------------
    })
})
