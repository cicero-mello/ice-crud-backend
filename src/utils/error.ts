import { ZodError } from "zod"

export const getZodError = (error: unknown): string => (
    error instanceof ZodError ?
    error.errors[0].message
    : "Unknown Error"
)

export const getError = (error: unknown): string => {
    if (error instanceof ZodError) return getZodError(error)
    if (error instanceof Error) return error.message
    return "Unknown Error"
}
