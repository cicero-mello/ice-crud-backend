import { z } from "zod"
import { Size } from "../../types"

export const schema = z.object({
    size:
        z.nativeEnum(Size, {
            message: "Invalid Size"
        })
})
