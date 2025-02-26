import { ZodError } from "zod"

export const hexColorRegex = /^#(?:[0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/
export const noScriptPattern = /^(?!.*(<script.*?>|<\/script>|eval\(|document\.|window\.))/i
export const usernameSpecialCharacters = /^[A-Za-z0-9._-]+(?: [A-Za-z0-9._-]+)*$/

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

export const getMinAndMaxNumberFromEnum = (
    enumType: object
) => {
    const enumInNumbers = (
        Object.values(enumType).filter(v => typeof v === "number") as number[]
    )
    const max = Math.max(...enumInNumbers)
    const min = Math.min(...enumInNumbers)
    return {
        max, min
    }
}
