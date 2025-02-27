import { z } from "zod"
import { Size } from "#enums"
import { hexColorRegex } from "#utils"

export const base = z.object({
    color:
        z.string({ message: "Color Must be String Type" })
            .regex(hexColorRegex, {
                message: "Color Must be Hex",
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
