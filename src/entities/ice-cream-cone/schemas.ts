import { z } from "zod"
import { Size } from "#enums"
import { hexColorRegex } from "#utils"

export const base = z.object({
    color:
        z.string({ message: "Color Must be String Type"})
        .regex(hexColorRegex, {
            message: "Color Must be Hex",
        }),
    size:
        z.nativeEnum(Size, {
            message: "Invalid Size"
        })
}).strict()
