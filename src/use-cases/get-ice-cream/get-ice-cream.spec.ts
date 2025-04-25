import { IceCream, IceCreamBall, IceCreamCup } from "#entities"
import * as R from "#repositories/in-memory"
import { describe, expect, test } from "vitest"
import { Avatar, Size, BallFlavor } from "#enums"
import { CreateCustomer, CreateIceCream } from "#use-cases"
import { getError } from "#utils"
import { GetIceCream } from "."

describe("Use Cases || GetIceCream", () => {
    test("Get Ice Cream", async () => {
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

        const created = await createIceCream.execute({
            customerId: customer.id,
            iceCream: new IceCream({
                name: "My ice cream",
                base: new IceCreamCup({ size: Size.medium }),
                balls: [new IceCreamBall({
                    flavor: BallFlavor.Chocolate,
                    size: Size.big
                })]
            })
        })

        let iceCreamObtained

        try {
            const getIceCream = new GetIceCream({
                iceCreamConeRepo,
                iceCreamCupRepo,
                iceCreamRepo
            })
            iceCreamObtained = await getIceCream.execute({
                iceCreamId: created.iceCream.id
            })
        } catch (error) {
            expect.fail(getError(error))
        }
        const { iceCream } = iceCreamObtained
        expect(iceCream.balls).toEqual(created.iceCream.balls)
        expect(iceCream.name).toEqual(created.iceCream.name)
        expect(iceCream.id).toEqual(created.iceCream.id)
        expect(iceCream.baseType).toEqual(created.iceCreamDBRow.baseType)
        expect(iceCream.base.id).toEqual(created.iceCream.base.id)
        expect(iceCream.base.size).toEqual(created.iceCream.base.size)
    })
})
