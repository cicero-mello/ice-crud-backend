import { describe, expect, test } from "vitest"
import * as R from "#repositories/in-memory"
import { CreateCustomer } from "#use-cases/create-customer"
import { Avatar, BallFlavor, IceCreamBaseType, Size } from "#enums"
import { CreateIceCream } from "#use-cases/create-ice-cream"
import { IceCream, IceCreamBall, IceCreamCup } from "#entities"
import { RenameIceCream } from "."
import { getError } from "#utils"
import { nanoid } from "nanoid"

describe("Use Cases || RenameIceCream", () => {
    test("Renaming Existent/Inexistent Ice Cream", async () => {
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

        const firstName = "First Ice Cream Name"
        const iceCream = new IceCream({
            name: firstName,
            base: new IceCreamCup({ size: Size.medium }),
            balls: [new IceCreamBall({
                flavor: BallFlavor.Chocolate,
                size: Size.big
            })]
        })

        await createIceCream.execute({
            customerId: customer.id,
            iceCream: iceCream
        })

        expect(iceCreamRepo.iceCreams).toHaveLength(1)
        expect(iceCreamRepo.iceCreams[0].name).toEqual(firstName)

        // Existent ---------------------------------------------------
        const newIceCreamName = "Second Ice Cream Name"
        try {
            const renameIceCream = new RenameIceCream({
                iceCreamRepo
            })
            await renameIceCream.execute({
                iceCreamId: iceCream.id,
                newIceCreamName: newIceCreamName
            })
        } catch (error) {
            expect.fail(getError(error))
        }

        expect(iceCreamRepo.iceCreams).toHaveLength(1)
        expect(iceCreamRepo.iceCreams[0].name).toEqual(newIceCreamName)
        expect(iceCreamRepo.iceCreams[0].baseType).toEqual(IceCreamBaseType.Cup)
        expect(iceCreamRepo.iceCreams[0].customerId).toEqual(customer.id)
        expect(iceCreamRepo.iceCreams[0].id).toEqual(iceCream.id)
        // -------------------------------------------------------------

        // Inexistent --------------------------------------------------
        try {
            const renameIceCream = new RenameIceCream({
                iceCreamRepo
            })
            await renameIceCream.execute({
                iceCreamId: nanoid(),
                newIceCreamName: newIceCreamName
            })
        } catch (error) {
            expect(!!error).toEqual(true)
            return
        }
        expect.fail("Didn't Trigger Error")
        // -------------------------------------------------------------
    })
})
