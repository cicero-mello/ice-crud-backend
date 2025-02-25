import { expect, test } from "vitest"
import { IceCreamCup } from "."
import { Size } from "../../types"
import { ZodError } from "zod"

test("Create Class", () => {
    const size = Size.big

    let cup
    try {
        cup = new IceCreamCup({ size })
    } catch (error) {
        expect.fail("Creation Error")
    }

    expect(cup).toBeInstanceOf(IceCreamCup)
})

test("Read Props", () => {
    const size = Size.big

    let cup
    try {
        cup = new IceCreamCup({ size })
    } catch (error) {
        expect.fail("Creation Error")
    }

    expect(cup.size).toEqual(size)
})

test("Use Invalid Size", () => {
    const sizeInNumbers = (
        Object.values(Size).filter(v => typeof v === "number") as number[]
    )
    const maxSize = Math.max(...sizeInNumbers)
    const minSize = Math.min(...sizeInNumbers)
    const invalidSizes = [maxSize + 1, minSize - 1, "a", null, undefined]

    void invalidSizes.forEach((size: any) => {
        try {
            new IceCreamCup({ size })
        } catch (error: any) {
            expect(error).toBeInstanceOf(ZodError)
            expect(error.errors[0].message).toBe("Invalid Size")
            return
        }
        expect.fail("Didn't Trigger ZodError")
    })
})
