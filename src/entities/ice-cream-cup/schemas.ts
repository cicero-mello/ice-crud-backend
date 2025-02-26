import { z } from "zod"
import { Size } from "#types"

export const base = z.object({
    size:
        z.nativeEnum(Size, {
            message: "Invalid Size"
        })
}).strict()
