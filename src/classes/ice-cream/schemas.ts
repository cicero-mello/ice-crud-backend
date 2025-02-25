import { IceCreamCone } from "#classes/ice-cream-cone"
import { IceCreamCup } from "#classes/ice-cream-cup"
import { IceCreamBall } from "#classes/ice-cream-ball"
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
        )
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
    .instanceof(IceCreamCone,{
        message: "Invalid Cone"
    }).or(
        z.instanceof(IceCreamCup, {
            message: "Invalid Cup"
        })
    )
)
