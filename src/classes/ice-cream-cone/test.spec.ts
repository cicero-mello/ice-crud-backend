import { getMinAndMaxNumberFromEnum } from "#utils"
import { expect, test, } from "vitest"
import { IceCreamCone } from ".."
import { Size } from "#types"
import { ZodError } from "zod"

test("Create Class", () => {
    const color = "#FFFFFF"
    const size = Size.medium

    let cone
    try{
        cone = new IceCreamCone({ color, size })
    } catch (error: any) {
        expect.fail("Creation Class Error")
    }

    expect(cone).toBeInstanceOf(IceCreamCone)
})

test("Read Props", () => {
    const color = "#FFFFFF"
    const size = Size.medium

    let cone
    try{
        cone = new IceCreamCone({ color, size })
    } catch (error: any) {
        expect.fail("Creation Class Error")
    }

    expect(color).toBe(cone.color)
    expect(size).toBe(cone.size)
})

test("Use Invalid Color", () => {
    const invalidColors = [
        "F", "#F", "#", 0, "@", "red", 1, "#ffffffa",
        null, undefined, ""
    ]

    invalidColors.forEach((color: any) => {
        try {
            new IceCreamCone({ color, size: Size.medium })
        } catch (error: any) {
            expect(error).toBeInstanceOf(ZodError)
            expect(error.errors[0].message).toBe("Invalid Color")
            return
        }
        expect.fail("Didn't Trigger ZodError")
    })
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
            new IceCreamCone({ color: "#FFFFFFCA", size })
        } catch (error: any) {
            expect(error).toBeInstanceOf(ZodError)
            expect(error.errors[0].message).toBe("Invalid Size")
            return
        }
        expect.fail("Didn't Trigger ZodError")
    })
})
