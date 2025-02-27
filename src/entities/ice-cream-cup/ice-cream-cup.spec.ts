import { getError, getMinAndMaxNumberFromEnum } from "#utils"
import { describe, expect, test } from "vitest"
import { IceCreamCup } from "."
import { Size } from "#enums"
import { ZodError } from "zod"
import { nanoid } from "nanoid"

describe("IceCreamCup", () => {
    test("Create Class", () => {
        const size = Size.big

        let cup
        try {
            cup = new IceCreamCup({ size })
        } catch (error) {
            expect.fail("Creation Class Error")
        }

        expect(cup).toBeInstanceOf(IceCreamCup)
    })

    test("Read Props", () => {
        const size = Size.big
        let cup = new IceCreamCup({ size })
        expect(cup.size).toEqual(size)
        expect(cup.id).toBeTypeOf("string")
        expect(cup.id.length).toBeGreaterThan(20)
    })

    test("Create Class With Id", () => {
        const id = nanoid()

        let cup
        try {
            cup = new IceCreamCup({
                size: Size.big,
                id: id
            })
        } catch (error) {
            expect.fail(getError(error))
        }

        expect(cup.id).toEqual(id)
    })

    test("Use Invalid Size", () => {
        const size = getMinAndMaxNumberFromEnum(Size)
        const invalidSizes = [
            size.max + 1,
            size.min - 1,
            "a", null, undefined
        ]

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
})
