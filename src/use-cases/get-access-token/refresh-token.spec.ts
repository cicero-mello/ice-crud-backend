import { CustomerRepoInMemory } from "#repositories/in-memory"
import { describe, expect, test } from "vitest"
import { GetAccessToken } from "."
import { CreateCustomer, CustomerLogin } from "#use-cases"
import { Avatar } from "#enums"
import { getError } from "#utils"

describe("Use Cases || GetAccessToken", () => {
    test("Get AccessToken With Valid RefreshToken", async () => {
        const customerRepo = new CustomerRepoInMemory()

        const createCustomer = new CreateCustomer({
            customerRepo
        })
        await createCustomer.execute({
            avatar: Avatar.PartyMan,
            name: "customer_name",
            pass: "customer_pass"
        })

        const customerLogin = new CustomerLogin({
            customerRepo
        })
        const tokens = await customerLogin.execute({
            name: "customer_name",
            pass: "customer_pass"
        })

        try {
            const getAccessToken = new GetAccessToken({
                customerRepo
            })
            const { accessToken } = await getAccessToken.execute(
                tokens.refreshToken
            )

            expect(accessToken).toBeTypeOf("string")
            expect(accessToken.length).toBeGreaterThan(0)
            expect(accessToken != tokens.accessToken).toEqual(true)
        } catch (error) {
            expect.fail(getError(error))
        }
    })

    test("Get AccessToken With Invalid RefreshToken", async () => {
        const customerRepo = new CustomerRepoInMemory()

        const createCustomer = new CreateCustomer({
            customerRepo
        })
        await createCustomer.execute({
            avatar: Avatar.PartyMan,
            name: "customer_name",
            pass: "customer_pass"
        })

        const customerLogin = new CustomerLogin({
            customerRepo
        })
        const tokens = await customerLogin.execute({
            name: "customer_name",
            pass: "customer_pass"
        })

        try {
            const getAccessToken = new GetAccessToken({
                customerRepo
            })
            await getAccessToken.execute(
                tokens.refreshToken + 1
            )
        } catch (error) {
            expect(!!error).toEqual(true)
            return
        }
        expect.fail("Didn't Trigger Error")
    })
})
