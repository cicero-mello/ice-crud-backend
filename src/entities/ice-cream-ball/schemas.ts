import { z } from "zod"
import { Size } from "../../enums"
import { BallFlavor } from "./types"

export const base = z.object({
    flavor:
        z.nativeEnum(BallFlavor, {
            message: "Invalid Flavor"
        }),
    size:
        z.nativeEnum(Size, {
            message: "Invalid Size"
        }),
    id: z
        .string({ message: "Id must be string" })
        .min(20, { message: "This id is too short to be valid" })
        .optional()
}).strict()

export const updateBall = z.object({
    flavor:
        z.nativeEnum(BallFlavor, {
            message: "Invalid Flavor"
        }).optional(),
    size:
        z.nativeEnum(Size, {
            message: "Invalid Size"
        }).optional()
}).strict()
