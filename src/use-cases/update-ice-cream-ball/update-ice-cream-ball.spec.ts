import { describe, expect, test } from "vitest"
import * as R from "#repositories/in-memory"
import { CreateCustomer } from "#use-cases/create-customer"
import { Avatar, Size, BallFlavor } from "#enums"
import { CreateIceCream } from "#use-cases/create-ice-cream"
import { IceCream, IceCreamBall, IceCreamCup } from "#entities"
import { UpdateIceCreamBall } from "."
import { getError } from "#utils"
import { nanoid } from "nanoid"

describe("Use Cases || UpdateIceCreamBall", () => {
    test("Updating With Valid/Invalid IceCreamId", async () => {
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

        const ball = new IceCreamBall({
            flavor: BallFlavor.Chocolate,
            size: Size.small,
        })

        const iceCream = new IceCream({
            name: "Just a simple name",
            base: new IceCreamCup({ size: Size.medium }),
            balls: [ball]
        })

        await createIceCream.execute({
            customerId: customer.id,
            iceCream: iceCream
        })

        expect(iceCreamBallRepo.iceCreamBalls).toHaveLength(1)
        expect(iceCreamBallRepo.iceCreamBalls[0].id).toEqual(ball.id)
        expect(iceCreamBallRepo.iceCreamBalls[0].flavor).toEqual(ball.flavor)
        expect(iceCreamBallRepo.iceCreamBalls[0].size).toEqual(ball.size)
        expect(iceCreamBallRepo.iceCreamBalls[0].iceCreamId).toEqual(iceCream.id)

        // Valid -----------------------------------------------------------------------
        try {
            const updateIceCreamBall = new UpdateIceCreamBall({
                iceCreamBallRepo,
                iceCreamRepo
            })
            ball.updateBall({
                flavor: BallFlavor.Vanilla,
                size: Size.big
            })
            await updateIceCreamBall.execute({
                iceCreamBall: ball,
                iceCreamId: iceCream.id
            })
            expect(iceCreamBallRepo.iceCreamBalls).toHaveLength(1)
            expect(iceCreamBallRepo.iceCreamBalls[0].id).toEqual(ball.id)
            expect(iceCreamBallRepo.iceCreamBalls[0].iceCreamId).toEqual(iceCream.id)
            expect(iceCreamBallRepo.iceCreamBalls[0].flavor).toEqual(BallFlavor.Vanilla)
            expect(iceCreamBallRepo.iceCreamBalls[0].size).toEqual(Size.big)
        } catch (error) {
            expect.fail(getError(error))
        }
        // -----------------------------------------------------------------------------

        // Invalid ---------------------------------------------------------------------
        try {
            const updateIceCreamBall = new UpdateIceCreamBall({
                iceCreamBallRepo,
                iceCreamRepo
            })
            ball.updateBall({
                flavor: BallFlavor.Vanilla,
                size: Size.big
            })
            await updateIceCreamBall.execute({
                iceCreamBall: ball,
                iceCreamId: nanoid()
            })
            expect.fail("Didn't Trigger Error")
        } catch (error) {
            expect(!!error).toEqual(true)
            return
        }
        // -----------------------------------------------------------------------------
    })
})
