import { IceCreamCone } from "#entities/ice-cream-cone"
import { IceCreamCup } from "#entities/ice-cream-cup"
import { IceCreamBall } from "#entities/ice-cream-ball"
import { noScriptPattern } from "#utils"
import { z } from "zod"

export const name = (z
    .string({ message: "Name must be string" })
    .min(1, { message: "Name must have at least 1 char" })
    .max(32, { message: "Name exceed max length (32)" })
    .regex(noScriptPattern, {
        message: "Name has a suspicious script pattern"
    })
)

export const base = z.object({
    name:
        name,
    balls:
        z.instanceof(IceCreamBall, {
            message: "Invalid Ball"
        }).array(),
    base:
        z.instanceof(IceCreamCone, {
            message: "Invalid Cone"
        }).or(
            z.instanceof(IceCreamCup, {
                message: "Invalid Cup"
            })
        ),

    id: z
        .string({ message: "Id must be string" })
        .min(20, { message: "This id is too short to be valid" })
        .optional()
}).strict()

export const addBall = z.instanceof(
    IceCreamBall,
    { message: "Invalid Ball" }
)

export const removeBall = (z
    .string({ message: "Invalid Id format" })
    .min(20, { message: "Invalid Id size" })
)

export const updateBase = (z
    .instanceof(IceCreamCone, {
        message: "Invalid Cone"
    }).or(
        z.instanceof(IceCreamCup, {
            message: "Invalid Cup"
        })
    )
)
