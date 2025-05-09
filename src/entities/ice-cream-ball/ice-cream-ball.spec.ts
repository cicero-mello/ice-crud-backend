import { getError, getMinAndMaxNumberFromEnum, getZodError } from "#utils"
import { describe, expect, test } from "vitest"
import { IceCreamBall } from "."
import { BallFlavor, Size } from "#enums"
import { ZodError } from "zod"
import { nanoid } from "nanoid"

describe("IceCreamBall", () => {
    test("Create Class", () => {
        const flavor = BallFlavor.Vanilla
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
        const flavor = BallFlavor.Vanilla
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

    test("Create Class With Id", () => {
        const id = nanoid()
        let ball
        try {
            ball = new IceCreamBall({
                flavor: BallFlavor.Vanilla,
                size: Size.medium,
                id: id
            })
        } catch (error: any) {
            expect.fail(getError(error))
        }

        expect(ball.id).toEqual(id)
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
                new IceCreamBall({ flavor: BallFlavor.Vanilla, size })
            } catch (error: any) {
                expect(error).toBeInstanceOf(ZodError)
                expect(getZodError(error)).toBe("Invalid Size")
                return
            }
            expect.fail("Didn't Trigger ZodError")
        })
    })

    test("Use Invalid Flavor", () => {
        const flavor = getMinAndMaxNumberFromEnum(BallFlavor)
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
        const flavor = BallFlavor.Vanilla
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
        const flavor = BallFlavor.Chocolate
        const size = Size.medium
        let ball: IceCreamBall

        try {
            ball = new IceCreamBall({ flavor, size })
        } catch (error: any) {
            expect.fail(getZodError(error))
        }

        const newFlavor = BallFlavor.Vanilla
        const newSize = Size.medium
        const ballId = ball.id

        ball.updateBall({ flavor: newFlavor, size: newSize })

        expect(ball.flavor).toEqual(newFlavor)
        expect(ball.size).toEqual(newSize)
        expect(ball.id).toEqual(ballId)
    })

    test("Use Invalid Data to Update Ball", () => {
        const flavor = BallFlavor.Chocolate
        const size = Size.big
        let ball: IceCreamBall

        try {
            ball = new IceCreamBall({ flavor, size })
        } catch (error: any) {
            expect.fail(getZodError(error))
        }

        const newInvalidFlavor = (
            getMinAndMaxNumberFromEnum(BallFlavor).max
            + 1
        )

        const newInvalidSize = (
            getMinAndMaxNumberFromEnum(Size).min
            - 1
        )

        const invalidValues = [
            [newInvalidFlavor, newInvalidSize],
            [null, null],
            ["a", "a"],
            [null, Size.medium],
            [BallFlavor.Chocolate, "a"],
            ["", ""]
        ]

        invalidValues.forEach((value) => {
            try {
                ball.updateBall({
                    flavor: value[0] as any,
                    size: value[1] as any
                })
            } catch (error) {
                expect(error).toBeInstanceOf(ZodError)
                return
            }
            expect.fail("Didn't Trigger ZodError")
        })
    })

    test("Use Valid Data to Update Ball", () => {
        const flavor = BallFlavor.Chocolate
        const size = Size.big
        let ball: IceCreamBall

        try {
            ball = new IceCreamBall({ flavor, size })
        } catch (error: any) {
            expect.fail(getZodError(error))
        }

        const validValues = [
            [BallFlavor.Chocolate, Size.medium],
            [BallFlavor.Vanilla, undefined],
            [undefined, Size.big],
            [undefined, undefined]
        ]

        validValues.forEach((value) => {
            try {
                ball.updateBall({
                    flavor: value[0] as any,
                    size: value[1] as any
                })
            } catch (error) {
                expect.fail(getZodError(error))
            }
        })

        expect(ball.flavor).toBe(BallFlavor.Vanilla)
        expect(ball.size).toBe(Size.big)
    })
})
