import { IceCream, IceCreamBall, IceCreamCup } from "#entities"
import { CreateIceCream } from "#use-cases/create-ice-cream"
import { CreateCustomer } from "#use-cases/create-customer"
import { describe, expect, test } from "vitest"
import * as R from "#repositories/in-memory"
import { Avatar, Size, BallFlavor } from "#enums"
import { getError } from "#utils"
import { nanoid } from "nanoid"

describe("Use Cases || DeleteIceCream", () => {
    test("Delete IceCream", async () => {
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

        const created = await createIceCream.execute({
            customerId: customer.id,
            iceCream: new IceCream({
                name: "My ice cream",
                base: new IceCreamCup({ size: Size.medium }),
                balls: [new IceCreamBall({
                    flavor: BallFlavor.chocolate,
                    size: Size.big
                })]
            })
        })

        await createIceCream.execute({
            customerId: customer.id,
            iceCream: new IceCream({
                name: "My other ice cream",
                base: new IceCreamCup({ size: Size.small }),
                balls: [new IceCreamBall({
                    flavor: BallFlavor.vanilla,
                    size: Size.small
                })]
            })
        })

        expect(iceCreamRepo.iceCreams).toHaveLength(2)
        expect(iceCreamRepo.iceCreams.find(
            ({ id }) => id === created.iceCream.id
        )).toEqual(created.iceCreamDBRow)

        try {
            await iceCreamRepo.delete({
                iceCreamId: created.iceCream.id
            })
        } catch (error) {
            expect.fail(getError(error))
        }

        expect(iceCreamRepo.iceCreams).toHaveLength(1)
        expect(iceCreamRepo.iceCreams.find(
            ({ id }) => id === created.iceCream.id
        )).toEqual(undefined)
    })

    test("Delete Inexistent IceCream", async () => {
        const iceCreamConeRepo = new R.IceCreamConeRepoInMemory()
        const iceCreamCupRepo = new R.IceCreamCupRepoInMemory()
        const iceCreamBallRepo = new R.IceCreamBallRepoInMemory()
        const iceCreamRepo = new R.IceCreamRepoInMemory({
            iceCreamBallRepo,
            iceCreamConeRepo,
            iceCreamCupRepo
        })

        try {
            await iceCreamRepo.delete({
                iceCreamId: nanoid()
            })
        } catch (error) {
            expect(!!error).toEqual(true)
            return
        }

        expect.fail("Didn't Trigger Error")
    })
})
