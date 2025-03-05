import { IceCream, IceCreamBall, IceCreamCup } from "#entities"
import { CreateCustomer, CreateIceCream } from "#use-cases"
import { describe, expect, test } from "vitest"
import * as R from "#repositories/in-memory"
import { Avatar, BallFlavor, Size } from "#enums"
import { DeleteIceCreamBall } from "."
import { getError } from "#utils"
import { nanoid } from "nanoid"

describe("Use Cases || DeleteIceCreamBall", () => {
    test("Deleting With Valid/Invalid IceCreamId", async () => {
        const iceCreamConeRepo = new R.IceCreamConeRepoInMemory()

        const iceCreamCupRepo = new R.IceCreamCupRepoInMemory()
        const iceCreamBallRepo = new R.IceCreamBallRepoInMemory()
        const customerRepo = new R.CustomerRepoInMemory()
        const iceCreamRepo = new R.IceCreamRepoInMemory({
            iceCreamBallRepo,
            iceCreamConeRepo,
            iceCreamCupRepo
        })

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

        const ball1 = new IceCreamBall({
            flavor: BallFlavor.chocolate,
            size: Size.small,
        })

        const ball2 = new IceCreamBall({
            flavor: BallFlavor.vanilla,
            size: Size.big,
        })

        const iceCream = new IceCream({
            name: "Just a simple name",
            base: new IceCreamCup({ size: Size.medium }),
            balls: [ball1, ball2]
        })

        await createIceCream.execute({
            customerId: customer.id,
            iceCream: iceCream
        })

        expect(iceCreamBallRepo.iceCreamBalls).toHaveLength(2)

        // Valid ----------------------------------------------------------
        try {
            const deleteIceCreamBall = new DeleteIceCreamBall({
                iceCreamBallRepo
            })
            await deleteIceCreamBall.execute({
                iceCreamBallId: ball1.id
            })
            expect(iceCreamBallRepo.iceCreamBalls).toHaveLength(1)
            expect(iceCreamBallRepo.iceCreamBalls[0].id).toEqual(ball2.id)
        } catch (error) {
            expect.fail(getError(error))
        }
        // ----------------------------------------------------------------

        // Invalid --------------------------------------------------------
        try {
            const deleteIceCreamBall = new DeleteIceCreamBall({
                iceCreamBallRepo
            })
            await deleteIceCreamBall.execute({
                iceCreamBallId: nanoid()
            })
        } catch (error) {
            expect(!!error).toEqual(true)
            return
        }
        expect.fail("Didn't Trigger Error")
        // ----------------------------------------------------------------
    })
})
