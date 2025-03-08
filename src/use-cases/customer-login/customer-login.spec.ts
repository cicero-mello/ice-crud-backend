import { CustomerRepoInMemory } from "#repositories/in-memory"
import { CreateCustomer } from "#use-cases"
import { describe, expect, test } from "vitest"
import { CustomerLogin } from "."
import jwt from "jsonwebtoken"
import { getError } from "#utils"

describe("Use Cases || CustomerLogin", () => {
    test("Get Tokens With Valid Credentials", async () => {
        const customerRepo = new CustomerRepoInMemory()
        const createCustomer = new CreateCustomer({ customerRepo })

        const customerName = "customer username"
        const customerPass = "customer_pass"

        const { customer } = await createCustomer.execute({
            avatar: 0,
            name: customerName,
            pass: customerPass
        })

        try {
            const customerLogin = new CustomerLogin({ customerRepo })
            const tokens = await customerLogin.execute({
                name: customerName,
                pass: customerPass
            })

            const dataAccessToken: any = jwt.verify(
                tokens.accessToken, process.env.ACCESS_TOKEN_SECRET_KEY!
            )

            const dataRefreshToken: any = jwt.verify(
                tokens.refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY!
            )

            expect(tokens.accessToken).toBeTypeOf("string")
            expect(tokens.refreshToken).toBeTypeOf("string")
            expect(dataAccessToken.customerId).toEqual(customer.id)
            expect(dataRefreshToken.customerId).toEqual(customer.id)
        } catch (error) {
            expect.fail(getError(error))
        }
    })
    test("Get Error With Invalid Credentials", async () => {
        const customerRepo = new CustomerRepoInMemory()
        const createCustomer = new CreateCustomer({ customerRepo })

        const customerName = "customer username"
        const customerPass = "customer_pass"

        await createCustomer.execute({
            avatar: 0,
            name: customerName,
            pass: customerPass
        })

        try {
            const customerLogin = new CustomerLogin({ customerRepo })
            await customerLogin.execute({
                name: "customerName",
                pass: "customerPass"
            })
        } catch (error) {
            expect(!!error).toEqual(true)
            return
        }
        expect.fail("Didn't Trigger Error")
    })
})
