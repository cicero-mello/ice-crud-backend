import { zodValidate } from "#utils"
import { z } from "zod"

export const base = z.object({
    iceCreamId: zodValidate.id,
    newIceCreamName: zodValidate.iceCreamName
})
