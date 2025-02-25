import { z } from "zod"
import { Size } from "../../types"
import { BallFlavor } from "./types"

export const schema = z.object({
    flavor:
        z.nativeEnum(BallFlavor, {
            message: "Invalid Flavor"
        }),
    size:
        z.nativeEnum(Size, {
            message: "Invalid Size"
        })
}).strict()

export const updateBallSchema = z.object({
    flavor:
        z.nativeEnum(BallFlavor, {
            message: "Invalid Flavor"
        }).optional(),
    size:
        z.nativeEnum(Size, {
            message: "Invalid Size"
        }).optional()
}).strict()