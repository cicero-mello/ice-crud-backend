import { z } from "zod"
import { Size } from "#enums"

export const base = z.object({
    size:
        z.nativeEnum(Size, {
            message: "Invalid Size"
        }),
    id: z
        .string({ message: "Id must be string" })
        .min(20, { message: "This id is too short to be valid" })
        .optional()
}).strict()
