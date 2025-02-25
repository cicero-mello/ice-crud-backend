import { getMinAndMaxNumberFromEnum, getZodError } from "#utils"
import { expect, test } from "vitest"
import { BallFlavor } from "./types"
import { IceCreamBall } from "./"
import { Size } from "#types"
import { ZodError } from "zod"

test("Create Class", () => {
    const flavor = BallFlavor.vanilla
    const size = Size.medium
    let ball

    try {
        ball = new IceCreamBall({ flavor, size })
    } catch (error: any) {
        expect.fail(getZodError(error))
    }

    expect(ball).toBeInstanceOf(IceCreamBall)
})

test("Read Props", () => {
    const flavor = BallFlavor.vanilla
    const size = Size.medium
    let ball

    try {
        ball = new IceCreamBall({ flavor, size })
    } catch (error: any) {
        expect.fail(getZodError(error))
    }

    expect(ball.flavor).toEqual(flavor)
    expect(ball.size).toEqual(size)
    expect(ball.id).toBeTypeOf("string")
})

test("Use Invalid Size", () => {
    const size = getMinAndMaxNumberFromEnum(Size)
    const invalidSizes = [
        size.max + 1,
        size.min - 1,
        "a", null, undefined
    ]

    invalidSizes.forEach((size: any) => {
        try {
            new IceCreamBall({ flavor: BallFlavor.vanilla, size })
        } catch (error: any) {
            expect(error).toBeInstanceOf(ZodError)
            expect(getZodError(error)).toBe("Invalid Size")
            return
        }
        expect.fail("Didn't Trigger ZodError")
    })
})

test("Use Invalid Flavor", () => {
    const flavor = getMinAndMaxNumberFromEnum(Size)
    const invalidFlavors = [
        flavor.max + 1,
        flavor.min - 1,
        "a", null, undefined
    ]

    invalidFlavors.forEach((flavor: any) => {
        try {
            new IceCreamBall({ flavor, size: Size.big })
        } catch (error: any) {
            expect(error).toBeInstanceOf(ZodError)
            expect(getZodError(error)).toBe("Invalid Flavor")
            return
        }
        expect.fail("Didn't Trigger ZodError")
    })
})

test("Create Id", () => {
    const flavor = BallFlavor.vanilla
    const size = Size.medium
    let ball

    try {
        ball = new IceCreamBall({ flavor, size })
    } catch (error: any) {
        expect.fail(getZodError(error))
    }

    expect(ball.id).toBeTypeOf("string")
    expect(ball.id.length).toBeGreaterThan(20)
})


test("Update Ball", () => {
    const flavor = BallFlavor.chocolate
    const size = Size.medium
    let ball: IceCreamBall

    try {
        ball = new IceCreamBall({ flavor, size })
    } catch (error: any) {
        expect.fail(getZodError(error))
    }

    const newFlavor = BallFlavor.vanilla
    const newSize = Size.medium
    const ballId = ball.id

    ball.updateBall({ flavor: newFlavor, size: newSize })

    expect(ball.flavor).toEqual(newFlavor)
    expect(ball.size).toEqual(newSize)
    expect(ball.id).toEqual(ballId)
})
