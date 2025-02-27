import { noScriptPattern } from "#utils"
import { z } from "zod"

export const base = z.object({
    iceCreamId: z
        .string({ message: "Id must be string type" })
        .min(20, { message: "This id is too short to be valid" })
        .regex(noScriptPattern, {
            message: "This Id has a suspicious script pattern"
        }),
}).strict()
