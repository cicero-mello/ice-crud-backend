import { getError, getMinAndMaxNumberFromEnum, getZodError } from "#utils"
import { generateHash, generateSalt } from "#utils/crypto"
import { expect, test, describe } from "vitest"
import { Avatar, Size } from "#enums"
import { ZodError } from "zod"
import { Customer } from "."
import {
    IceCream,
    IceCreamBall,
    BallFlavor,
    IceCreamCone,
    IceCreamCup
} from "#entities"
import { nanoid } from "nanoid"

describe("Customer", () => {
    test("Create Class", () => {
        const name = "cicero-mello"
        const pass = "veryNicePassword123"
        const avatar = Avatar.OldMan

        try {
            const customer = new Customer({
                avatar, name, pass
            })
            expect(customer).toBeInstanceOf(Customer)
        } catch (error) {
            expect.fail(getZodError(error))
        }
    })

    test("Reading Props", () => {
        const name = "any.User-Name"
        const pass = "veryNice Password321"
        const avatar = Avatar.OldMan

        const customer = new Customer({
            avatar, name, pass
        })

        expect(customer.name).toEqual(name)

        expect(customer.hash).toBeTypeOf("string")
        expect(customer.hash.length).toEqual(64)

        expect(customer.salt).toBeTypeOf("string")
        expect(customer.salt.length).toEqual(16)

        expect(customer.avatar).toEqual(avatar)

        expect(customer.id).toBeTypeOf("string")
        expect(customer.id.length).toBeGreaterThan(20)

        expect(Array.isArray(customer.iceCreams)).toBe(true)
        expect(customer.iceCreams.length).toEqual(0)
    })

    test("Use Valid Names", () => {
        const pass = "veryNice Password321"
        const avatar = Avatar.OldMan
        const names = [
            "nome",
            "OUTRO NOME",
            "other- .name",
            "123.4-312_name",
            "_.-douzo yoroshiku-._"
        ]

        names.forEach((name) => {
            try {
                const customer = new Customer({
                    avatar, name, pass
                })
                expect(customer.name).toEqual(name)
            } catch (error) {
                expect.fail(getZodError(error))
            }
        })
    })

    test("Use Invalid Names", () => {
        const pass = "veryNice Password321"
        const avatar = Avatar.OldMan
        const names = [
            "", "   ", "test    ",
            "%", "@", "!", "#", "¨", "*", "(", ")",
            undefined, null, [], {}, 1, 0, false, true,
            "user name very extra large and big like 53 characters",
            "<script>alert('hack');</script>"
        ]

        names.forEach((name: any) => {
            try {
                const customer = new Customer({
                    avatar, name, pass
                })
            } catch (error) {
                expect(error).toBeInstanceOf(ZodError)
                return
            }
            expect.fail("Didn't Trigger ZodError")
        })
    })

    test("Use Invalid Avatars", () => {
        const pass = "veryNice Password321"
        const name = "username"

        const avatar = getMinAndMaxNumberFromEnum(Avatar)
        const invalidAvatars = [
            avatar.max + 1,
            avatar.min - 1,
            null, [], undefined, "", "a", false, true
        ]

        invalidAvatars.forEach((avatar: any) => {
            try {
                new Customer({ avatar, name, pass })
            } catch (error) {
                expect(error).toBeInstanceOf(ZodError)
                return
            }
            expect.fail("Didn't Trigger ZodError")
        })
    })

    test("Use Invalid Password", () => {
        const name = "username"
        const avatar = Avatar.AfroMan

        const invalidPasswords = [
            "short",
            "pass very extra large and big like 48 characters",
            null, undefined, [], false, true, 0, 1, {},
            "<script>alert('hack');</script>"
        ]

        invalidPasswords.forEach((pass: any) => {
            try {
                new Customer({ avatar, name, pass })
            } catch (error) {
                expect(!!error).toEqual(true)
                return
            }
            expect.fail("Didn't Trigger ZodError")
        })
    })

    test("Compare Password Hash", () => {
        const name = "any.User-Name"
        const pass = "esukareta-erebeta"
        const avatar = Avatar.OldMan

        const customer = new Customer({
            avatar, name, pass
        })

        const newHash = generateHash(
            pass, customer.salt
        )

        expect(newHash).toEqual(customer.hash)
    })

    test("Add Valid Ice Creams", () => {
        const name = "Osaka"
        const pass = "esukareta-erebeta"
        const avatar = Avatar.AsianYoungWoman

        const customer = new Customer({
            avatar, name, pass
        })

        const ball1 = new IceCreamBall({
            flavor: BallFlavor.chocolate,
            size: Size.big
        })

        const ball2 = new IceCreamBall({
            flavor: BallFlavor.vanilla,
            size: Size.medium
        })

        const ball3 = new IceCreamBall({
            flavor: BallFlavor.vanilla,
            size: Size.small
        })

        const cone = new IceCreamCone({
            color: "#FFFF",
            size: Size.big
        })

        const cup = new IceCreamCup({
            size: Size.medium
        })

        const iceCreams = [
            new IceCream({
                balls: [ball1, ball2],
                base: cone,
                name: "double cone"
            }),
            new IceCream({
                balls: [ball1, ball2, ball3],
                base: cup,
                name: "triple cup"
            }),
            new IceCream({
                balls: [ball1],
                base: cone,
                name: "classic"
            }),
            new IceCream({
                balls: [],
                base: cone,
                name: "sad"
            })
        ]

        iceCreams.forEach((iceCream, index) => {
            try {
                customer.addIceCream(iceCream)
                expect(customer.iceCreams.length).toEqual(index + 1)
                expect(!!customer.iceCreams.find(
                    (item) => item.id === iceCream.id
                )).toEqual(true)
            } catch (error) {
                expect.fail(getZodError(error))
            }
        })
    })

    test("Add Invalid Ice Creams", () => {
        const name = "Osaka"
        const pass = "esukareta-erebeta"
        const avatar = Avatar.AsianYoungWoman

        const customer = new Customer({
            avatar, name, pass
        })

        const invalidIceCreams = [
            new IceCreamBall({
                flavor: BallFlavor.chocolate,
                size: Size.big
            }),
            new IceCreamCone({
                color: "#FFFF",
                size: Size.big
            }),
            "", 0, 1, false, true, null, undefined
        ]

        invalidIceCreams.forEach((iceCream: any,) => {
            try {
                customer.addIceCream(iceCream)
            } catch (error) {
                expect(error).toBeInstanceOf(ZodError)
                return
            }
            expect.fail("Didn't Trigger ZodError")
        })
    })

    test("Remove Ice Creams", () => {
        const name = "Osaka"
        const pass = "esukareta-erebeta"
        const avatar = Avatar.AsianYoungWoman

        const customer = new Customer({
            avatar, name, pass
        })

        const cone = new IceCreamCone({
            color: "#FFFF",
            size: Size.big
        })

        const iceCreams = [
            new IceCream({
                balls: [],
                base: cone,
                name: "holy"
            }),
            new IceCream({
                balls: [],
                base: cone,
                name: "molly"
            }),
            new IceCream({
                balls: [],
                base: cone,
                name: "test"
            }),
            new IceCream({
                balls: [],
                base: cone,
                name: "test"
            })
        ]

        iceCreams.forEach((iceCream) => {
            customer.addIceCream(iceCream)
        })

        iceCreams.forEach((iceCream, index) => {
            try {
                customer.removeIceCream(iceCream.id)
                expect(customer.iceCreams.length).toEqual(
                    iceCreams.length - 1 - index
                )
                expect(!!customer.iceCreams.find(
                    ({ id }) => id === iceCream.id
                )).toEqual(false)
            } catch (error) {
                expect.fail(getZodError(error))
            }
        })
    })

    test("Remove Ice Creams With Invalid Ids", () => {
        const name = "Osaka"
        const pass = "esukareta-erebeta"
        const avatar = Avatar.AsianYoungWoman

        const customer = new Customer({
            avatar, name, pass
        })

        const invalidIds = [
            "a", "", [], {}, 0, 1,
            null, undefined, false, true
        ]

        invalidIds.forEach((invalidId: any) => {
            try {
                customer.removeIceCream(invalidId)
            } catch (error) {
                expect(error).toBeInstanceOf(ZodError)
                return
            }
            expect.fail("Didn't Trigger ZodError")
        })
    })

    test("Create Class With Full Props", () => {
        const name = "Osaka"
        const pass = "esukareta-erebeta"
        const avatar = Avatar.AsianYoungWoman
        const id = nanoid()
        const salt = generateSalt()
        const hash = generateHash(pass, salt)
        const iceCreams = [
            new IceCream({
                balls: [new IceCreamBall({
                    flavor: BallFlavor.chocolate,
                    size: Size.big
                })],
                base: new IceCreamCup({
                    size: Size.big
                }),
                name: "sorvete"
            })
        ]

        let customer
        try {
            customer = new Customer({
                avatar, name, pass,
                iceCreams, salt, id
            })
        } catch (error) {
            expect.fail(getError(error))
        }

        expect(customer.name).toEqual(name)
        expect(customer.hash).toEqual(hash)
        expect(customer.avatar).toEqual(avatar)
        expect(customer.id).toEqual(id)
        expect(customer.salt).toEqual(salt)
        expect(customer.iceCreams).toEqual(iceCreams)
    })
})
