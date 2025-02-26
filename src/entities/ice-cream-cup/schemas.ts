import { z } from "zod"
import { Size } from "#enums"

export const base = z.object({
    size:
        z.nativeEnum(Size, {
            message: "Invalid Size"
        })
}).strict()
