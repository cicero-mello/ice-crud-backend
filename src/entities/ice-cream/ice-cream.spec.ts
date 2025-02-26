import { Size } from "#types"
import { expect, test } from "vitest"
import { IceCream } from "."
import { getZodError } from "#utils"
import { ZodError } from "zod"
import {
    IceCreamBall,
    BallFlavor,
    IceCreamCone,
    IceCreamCup
} from "#entities"

const createClass = () => {
    const name = "Meu sorvetão"
    const balls = [new IceCreamBall({
        flavor: BallFlavor.chocolate,
        size: Size.big
    })]
    const base = new IceCreamCone({
        size: Size.medium,
        color: "#FFFFFF"
    })

    return new IceCream({
        name, balls, base
    })
}

test("Create Class", () => {
    let iceCream

    try {
        iceCream = createClass()
    } catch (error) {
        expect.fail(getZodError(error))
    }

    expect(iceCream).toBeInstanceOf(IceCream)
})

test("Read Props", () => {
    const name = "Meu sorvetão"
    const balls = [new IceCreamBall({
        flavor: BallFlavor.chocolate,
        size: Size.big
    })]
    const base = new IceCreamCone({
        size: Size.medium,
        color: "#FFFFFF"
    })
    let iceCream

    try {
        iceCream = new IceCream({
            name, balls, base
        })
    } catch (error) {
        expect.fail(getZodError(error))
    }

    expect(iceCream.base).toEqual(base)
    expect(iceCream.balls).toEqual(balls)
    expect(iceCream.name).toEqual(name)
})

test("Create Id", () => {
    const name = "Meu sorvetão"
    const balls = [new IceCreamBall({
        flavor: BallFlavor.chocolate,
        size: Size.big
    })]
    const base = new IceCreamCone({
        size: Size.medium,
        color: "#FFFFFF"
    })
    let iceCream

    try {
        iceCream = new IceCream({
            name, balls, base
        })
    } catch (error) {
        expect.fail(getZodError(error))
    }

    expect(iceCream.id).toBeTypeOf("string")
    expect(iceCream.id.length).toBeGreaterThan(20)
})

test("Use Invalid Names", () => {
    const balls = [new IceCreamBall({
        flavor: BallFlavor.chocolate,
        size: Size.big
    })]
    const base = new IceCreamCone({
        size: Size.medium,
        color: "#FFFFFF"
    })
    const invalidNames = [
        "",
        null,
        2,
        undefined,
        "",
        "<script>alert('hack');</script>"
    ]
    let iceCream

    invalidNames.forEach((name: any) => {
        try {
            iceCream = new IceCream({
                name, balls, base
            })
        } catch (error) {
            expect(error).toBeInstanceOf(ZodError)
            return
        }
        expect.fail("Didn't Trigger ZodError")
    })
})

test("Use Invalid Balls", () => {
    const name = "Soverte"
    const base = new IceCreamCone({
        size: Size.medium,
        color: "#FFFFFF"
    })
    const invalidBalls = [
        [2],
        null,
        undefined,
        "",
        "a"
    ]

    invalidBalls.forEach((balls: any) => {
        try {
            new IceCream({
                name, balls, base
            })
        } catch (error) {
            expect(error).toBeInstanceOf(ZodError)
            return
        }
        expect.fail("Didn't Trigger ZodError")
    })
})

test("Use Invalid Bases", () => {
    const name = "Soverte"
    const balls = [new IceCreamBall({
        flavor: BallFlavor.chocolate,
        size: Size.big
    })]
    const invalidBases = [
        null,
        new IceCreamBall({
            flavor: BallFlavor.chocolate,
            size: Size.small
        }),
        undefined,
        "",
        "a",
        0,
        1
    ]
    let iceCream

    invalidBases.forEach((base: any) => {
        try {
            iceCream = new IceCream({
                name, balls, base
            })
        } catch (error) {
            expect(error).toBeInstanceOf(ZodError)
            return
        }
        expect.fail("Didn't Trigger ZodError")
    })
})

test("Use Valid Bases", () => {
    const name = "Soverte"
    const balls = [new IceCreamBall({
        flavor: BallFlavor.chocolate,
        size: Size.big
    })]
    const validBases = [
        new IceCreamCone({
            color: "#FD3333CA",
            size: Size.medium
        }),
        new IceCreamCup({
            size: Size.small
        })
    ]
    let iceCream

    validBases.forEach((base: any) => {
        try {
            iceCream = new IceCream({
                name, balls, base
            })
        } catch (error) {
            expect.fail(getZodError(error))
        }
        expect(iceCream.base).toEqual(base)
    })
})

test("Rename Class", () => {
    const iceCream = createClass()
    const newNames = [
        "a",
        "12345678912345678901234566657456",
        "tasty",
        "LOReM"
    ]

    newNames.forEach((name) => {
        try {
            iceCream.rename(name)
            expect(iceCream.name).toEqual(name)
        } catch (error) {
            expect.fail(getZodError(error))
        }
    })
})

test("Rename Class With Invalid Values", () => {
    const iceCream = createClass()
    const newNames = [
        undefined,
        null,
        0,
        "",
        "11111111111111111111111111111111111"
    ]

    newNames.forEach((name: any) => {
        try {
            iceCream.rename(name)
        } catch (error) {
            expect(error).toBeInstanceOf(ZodError)
            return
        }
        expect.fail("Didn't Trigger ZodError")
    })
})

test("Add Balls", () => {
    const iceCream = createClass()
    const newBalls = [
        new IceCreamBall({
            flavor: BallFlavor.chocolate,
            size: Size.small
        }),
        new IceCreamBall({
            flavor: BallFlavor.vanilla,
            size: Size.medium
        }),
        new IceCreamBall({
            flavor: BallFlavor.chocolate,
            size: Size.big
        }),
    ]

    newBalls.forEach((ball, index) => {
        try {
            iceCream.addBall(ball)
            expect(iceCream.balls.length).toEqual(index + 2)
            expect(iceCream.balls.at(-1)).toEqual(ball)
        } catch (error) {
            expect.fail(getZodError(error))
        }
    })
})

test("Add Invalid Balls", () => {
    const iceCream = createClass()
    const newBalls = [
        new IceCreamCup({
            size: Size.small
        }),
        new IceCreamCone({
            size: Size.medium,
            color: "#E3E3"
        }),
        null,
        undefined,
        [],
        "",
        0,
        1
    ]

    newBalls.forEach((ball: any) => {
        try {
            iceCream.addBall(ball)
        } catch (error) {
            expect(error).toBeInstanceOf(ZodError)
            return
        }
        expect.fail("Didn't Trigger ZodError")
    })
})

test("Remove Balls", () => {
    const iceCream = createClass()
    const balls = [
        new IceCreamBall({
            flavor: BallFlavor.chocolate,
            size: Size.small
        }),
        new IceCreamBall({
            flavor: BallFlavor.vanilla,
            size: Size.medium
        }),
        new IceCreamBall({
            flavor: BallFlavor.chocolate,
            size: Size.big
        })
    ]

    balls.forEach((ball: any) => {
        iceCream.addBall(ball)
    })

    const ballsIds = iceCream.balls.map(
        ball => ball.id
    )

    ballsIds.forEach((ballId, index) => {
        try {
            const currentBall = iceCream.balls.find(
                ball => ball.id === ballId
            )
            expect(currentBall).toBeInstanceOf(IceCreamBall)

            iceCream.removeBall(ballId)
            expect(iceCream.balls.length).toEqual(
                ballsIds.length + 1 - (index + 2)
            )
            expect(iceCream.balls.find(
                ball => ball.id === ballId
            )).toEqual(undefined)

        } catch (error) {
            expect.fail(getZodError(error))
        }
    })
})

test("Remove Balls With Invalid Ids", () => {
    const iceCream = createClass()
    const balls = [
        new IceCreamBall({
            flavor: BallFlavor.chocolate,
            size: Size.small
        }),
        new IceCreamBall({
            flavor: BallFlavor.vanilla,
            size: Size.medium
        }),
        new IceCreamBall({
            flavor: BallFlavor.chocolate,
            size: Size.big
        })
    ]

    balls.forEach((ball: any) => {
        iceCream.addBall(ball)
    })

    const ballsIds = [
        "1",
        "",
        2,
        null,
        undefined,
        0,
        [],
        {}
    ]

    ballsIds.forEach((ballId: any) => {
        try {
            iceCream.removeBall(ballId)
        } catch (error) {
            expect(error).toBeInstanceOf(ZodError)
            return
        }
        expect.fail("Didn't Trigger ZodError")
    })
})

test("Update Base", () => {
    const iceCream = createClass()

    const newBases = [
        new IceCreamCone({
            color: "#FFFF",
            size: Size.medium
        }),
        new IceCreamCup({
            size: Size.medium
        }),
        new IceCreamCup({
            size: Size.small
        })
    ]

    newBases.forEach((newBase) => {
        try {
            iceCream.updateBase(newBase)
            expect(iceCream.base).toEqual(newBase)
        } catch (error) {
            expect.fail(getZodError(error))
        }
    })
})

test("Update Base With Wrong Values", () => {
    const iceCream = createClass()

    const newInvalidBases = [
        new IceCreamBall({
            flavor: BallFlavor.chocolate,
            size: Size.medium
        }),
        0,
        1,
        [],
        undefined,
        null,
        false,
        {},
        "",
        "1"
    ]

    newInvalidBases.forEach((newBase: any) => {
        try {
            iceCream.updateBase(newBase)
        } catch (error) {
            expect(error).toBeInstanceOf(ZodError)
            return
        }
        expect.fail("Didn't Trigger ZodError")
    })
})
