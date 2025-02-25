import { z } from "zod"
import { Size } from "#types"
import { hexColorRegex } from "#utils"

export const schema = z.object({
    color:
        z.string({ message: "Invalid Color"})
        .regex(hexColorRegex, {
            message: "Invalid Color",
        }),
    size:
        z.nativeEnum(Size, {
            message: "Invalid Size"
        })
})
