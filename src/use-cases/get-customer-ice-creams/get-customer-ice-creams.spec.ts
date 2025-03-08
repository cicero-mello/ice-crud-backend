import { Avatar, Size, BallFlavor, IceCreamBaseType } from "#enums"
import * as R from "#repositories/in-memory"
import { CreateCustomer, CreateIceCream } from "#use-cases"
import { describe, expect, expectTypeOf, test } from "vitest"
import { GetCustomerIceCreams } from "."
import { getError } from "#utils"
import { nanoid } from "nanoid"
import {
    IceCreamBall,
    IceCreamCone,
    IceCreamCup,
    IceCreamData
} from "#entities"

describe("Use Cases || GetCustomerIceCreams", () => {
    test("Get With Valid/Invalid Customer Id", async () => {
        const customerRepo = new R.CustomerRepoInMemory()
        const iceCreamBallRepo = new R.IceCreamBallRepoInMemory()
        const iceCreamConeRepo = new R.IceCreamConeRepoInMemory()
        const iceCreamCupRepo = new R.IceCreamCupRepoInMemory()
        const iceCreamRepo = new R.IceCreamRepoInMemory({
            iceCreamBallRepo,
            iceCreamConeRepo,
            iceCreamCupRepo
        })

        const createCustomer = new CreateCustomer({
            customerRepo: customerRepo
        })

        const { customer } = await createCustomer.execute({
            avatar: Avatar.YoungMan,
            name: "Johnny",
            pass: "Cash - - -"
        })

        const createIceCream = new CreateIceCream({
            customerRepo,
            iceCreamBallRepo,
            iceCreamConeRepo,
            iceCreamCupRepo,
            iceCreamRepo
        })

        const newIceCreams = [
            {
                name: "Ice Cream 1",
                balls: [new IceCreamBall({
                    flavor: BallFlavor.chocolate,
                    size: Size.big
                })],
                base: new IceCreamCone({
                    color: "#FFFFFF",
                    size: Size.medium
                })
            },
            {
                name: "Ice Cream 2",
                balls: [new IceCreamBall({
                    flavor: BallFlavor.vanilla,
                    size: Size.medium
                })],
                base: new IceCreamCup({
                    size: Size.small
                })
            }
        ]

        await Promise.all(newIceCreams.map(async (i) => {
            await createIceCream.execute({
                customerId: customer.id,
                iceCream: i
            })
        }))

        const getCustomerIceCreams = new GetCustomerIceCreams({
            iceCreamBallRepo,
            iceCreamConeRepo,
            iceCreamCupRepo,
            iceCreamRepo,
            customerRepo
        })

        // Valid ---------------------------------------------------------
        let customerIceCreams
        try {
            customerIceCreams = await getCustomerIceCreams.execute({
                customerId: customer.id
            })
        } catch (error) {
            expect.fail(getError(error))
        }

        const { iceCreams } = customerIceCreams
        expect(iceCreams).toHaveLength(2)
        expect(iceCreams[0].balls[0].flavor).toEqual(BallFlavor.chocolate)
        expect(iceCreams[1].balls[0].flavor).toEqual(BallFlavor.vanilla)
        expect(iceCreams[0].baseType).toEqual(IceCreamBaseType.Cone)
        expectTypeOf(iceCreams).toMatchTypeOf<IceCreamData[]>()
        // ---------------------------------------------------------------

        // Invalid -------------------------------------------------------
        try {
            await getCustomerIceCreams.execute({
                customerId: nanoid()
            })
        } catch (error) {
            expect(getError(error)).toEqual(
                "This Costumer ID Doesn't Match Any Costumer!"
            )
            return
        }
        expect.fail("Didn't Trigger Error")
        // ---------------------------------------------------------------
    })
})
