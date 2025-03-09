import { describe, expect, test } from "vitest"
import * as R from "#repositories/in-memory"
import { CreateCustomer, CreateIceCream } from "#use-cases"
import { Avatar, Size, BallFlavor } from "#enums"
import { IceCream, IceCreamBall, IceCreamCup } from "#entities"
import { AddIceCreamBall } from "."
import { getError } from "#utils"
import { nanoid } from "nanoid"

describe("Use Cases || AddIceCreamBall", () => {
    test("Adding With Valid/Invalid IceCreamId", async () => {
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

        const iceCream = new IceCream({
            name: "Just a simple name",
            base: new IceCreamCup({ size: Size.medium }),
            balls: []
        })

        await createIceCream.execute({
            customerId: customer.id,
            iceCream: iceCream
        })

        const newBall = new IceCreamBall({
            flavor: BallFlavor.chocolate,
            size: Size.small,
        })

        expect(iceCreamBallRepo.iceCreamBalls).toHaveLength(0)

        // Valid -------------------------------------------------------------
        try {
            const addIceCreamBall = new AddIceCreamBall({
                iceCreamBallRepo,
                iceCreamRepo
            })
            await addIceCreamBall.execute({
                iceCreamBall: newBall,
                iceCreamId: iceCream.id
            })
            expect(iceCreamBallRepo.iceCreamBalls).toHaveLength(1)
            expect(iceCreamBallRepo.iceCreamBalls[0].id).toEqual(newBall.id)
        } catch (error) {
            expect.fail(getError(error))
        }
        // --------------------------------------------------------------------

        // Invalid ------------------------------------------------------------
        try {
            const addIceCreamBall = new AddIceCreamBall({
                iceCreamBallRepo,
                iceCreamRepo
            })
            await addIceCreamBall.execute({
                iceCreamBall: newBall,
                iceCreamId: nanoid()
            })
        } catch (error) {
            expect(!!error).toEqual(true)
            return
        }
        expect.fail("Didn't Trigger Error")
        // --------------------------------------------------------------------
    })
})
