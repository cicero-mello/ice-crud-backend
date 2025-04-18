import { Avatar } from "#enums"
import { z } from "zod"
import { IceCream } from "#entities"
import {
    noScriptPattern,
    usernameSpecialCharacters
} from "#utils"

export const base = z.object({
    name: z
        .string({ message: "Name must be string" })
        .min(1, { message: "Name must have at least 1 char" })
        .max(32, { message: "Name exceed max length (32)" })
        .regex(usernameSpecialCharacters, {
            message:
                "You can't use special characters" +
                " (except '-', '.' and space between letters)"
        })
        .regex(noScriptPattern, {
            message: "Name has a suspicious script pattern"
        }),
    pass: z
        .string({ message: "Password must be string" })
        .min(8, {
            message: "Password need to have at least 8 characters"
        })
        .max(32, {
            message: "Password exceed max length (32)"
        })
        .regex(noScriptPattern, {
            message: "Password has a suspicious script pattern"
        }).optional(),
    avatar: z.nativeEnum(Avatar, {
        message: "Invalid Avatar"
    }),

    id: z
        .string({ message: "Id must be string" })
        .min(20, { message: "This id is too short to be valid" })
        .optional(),
    salt: z
        .string({ message: "Salt must be string" })
        .length(16, { message: "Invalid salt length" })
        .optional(),
    iceCreams: z
        .array(
            z.instanceof(
                IceCream,
                { message: "Must be a instance of IceCream " }
            )
        )
        .optional(),
    hash: z
        .string({ message: "Hash must be string" })
        .length(64, { message: "Invalid hash length" })
        .optional()
}).strict()

export const addIceCream = z.instanceof(IceCream, {
    message: "Invalid Ice Cream"
})

export const removeIceCream = (z
    .string({
        message: "IceCreamId Must Be String Type"
    })
    .min(20, {
        message: "Invalid IceCreamId"
    })
    .regex(noScriptPattern, {
        message: "IceCreamId has a suspicious script pattern"
    })
)

export const updateCustomerInfo = z.object({
    name: z.string({ message: "Name must be string" })
        .min(1, { message: "Name must have at least 1 char" })
        .max(32, { message: "Name exceed max length (32)" })
        .regex(usernameSpecialCharacters, {
            message:
                "You can't use special characters" +
                " (except '-', '.' and space between letters)"
        })
        .regex(noScriptPattern, {
            message: "Name has a suspicious script pattern"
        }),
    avatar: z.nativeEnum(Avatar, {
        message: "Invalid Avatar"
    })
})
