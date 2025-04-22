import { IceCream, IceCreamBall, IceCreamCup } from "#entities"
import * as R from "#repositories/in-memory"
import { describe, expect, test } from "vitest"
import { CreateIceCream } from "."
import { Avatar, IceCreamBaseType, Size, BallFlavor } from "#enums"
import { CreateCustomer } from "#use-cases"
import { getError } from "#utils"

describe("Use Cases || CreateIceCream", () => {
    test("Create IceCream", async () => {
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

        let created
        try {
            const createIceCream = new CreateIceCream({
                iceCreamBallRepo,
                iceCreamConeRepo,
                iceCreamCupRepo,
                iceCreamRepo,
                customerRepo
            })

            created = await createIceCream.execute({
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
        } catch (error) {
            expect.fail(getError(error))
        }

        expect(created.iceCream).toBeInstanceOf(IceCream)
    })

    test("Create IceCream With Invalid Customer Id", async () => {
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

        try {
            const createIceCream = new CreateIceCream({
                iceCreamBallRepo,
                iceCreamConeRepo,
                iceCreamCupRepo,
                iceCreamRepo,
                customerRepo
            })

            await createIceCream.execute({
                customerId: customer.id + "invalid",
                iceCream: new IceCream({
                    name: "My ice cream",
                    base: new IceCreamCup({ size: Size.medium }),
                    balls: [new IceCreamBall({
                        flavor: BallFlavor.Chocolate,
                        size: Size.big
                    })]
                })
            })
        } catch (error) {
            expect(!!error).toEqual(true)
            return
        }

        expect.fail("Didn't Trigger Error")
    })

    test("Read Created Data", async () => {
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

        const cup = new IceCreamCup({ size: Size.medium })
        const ball = new IceCreamBall({
            flavor: BallFlavor.Chocolate,
            size: Size.big
        })

        const { iceCream, iceCreamDBRow } = await createIceCream.execute({
            customerId: customer.id,
            iceCream: {
                name: "My ice cream",
                base: cup,
                balls: [ball]
            }
        })

        const customerDb = customerRepo.customers[0]
        const ballDb = iceCreamBallRepo.iceCreamBalls[0]
        const coneDb = iceCreamConeRepo.iceCreamCones?.[0] ?? null
        const cupDb = iceCreamCupRepo.iceCreamCups[0]
        const iceCreamDb = iceCreamRepo.iceCreams[0]

        expect(iceCreamDb.customerId).toBeTypeOf("string")
        expect(iceCreamDb.customerId.length).greaterThan(0)
        expect(iceCreamDb.customerId).toEqual(customerDb.id)

        expect(iceCreamDb.baseType).toEqual(IceCreamBaseType.Cup)

        expect(iceCreamDb.id).toEqual(iceCream.id)
        expect(iceCreamDb.id).toEqual(iceCreamDBRow.id)

        expect(iceCreamDb.name).toEqual(iceCream.name)
        expect(iceCreamDb.name).toEqual(iceCreamDb.name)

        expect(cupDb.iceCreamId).toEqual(iceCream.id)
        expect(cupDb.id).toEqual(iceCream.base.id)
        expect(cupDb.size).toEqual(cup.size)

        expect(coneDb).toEqual(null)

        expect(ballDb.iceCreamId).toEqual(iceCream.id)
        expect(ballDb.iceCreamId).toEqual(iceCreamDb.id)

        expect(ballDb.flavor).toEqual(ball.flavor)
        expect(ballDb.flavor).toEqual(iceCream.balls[0].flavor)
        expect(ballDb.size).toEqual(ball.size)
        expect(ballDb.size).toEqual(iceCream.balls[0].size)
    })
})
