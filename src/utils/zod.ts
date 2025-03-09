import { noScriptPattern } from "#utils"
import { z } from "zod"

export const id = (z
    .string({ message: "Id must be string type" })
    .min(20, { message: "This id is too short to be valid" })
    .regex(noScriptPattern, {
        message: "This Id has a suspicious script pattern"
    })
)

export const iceCreamName = (z
    .string({ message: "Ice Cream Name must be string type" })
    .regex(noScriptPattern, {
        message: "This Name has a suspicious script pattern"
    })
)

export const accessToken = (z
    .string({ message: "AccessToken Must Be String" })
    .regex(noScriptPattern, {
        message: "This AccessToken has a suspicious script pattern"
    })
)
