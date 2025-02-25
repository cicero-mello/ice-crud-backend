export const hexColorRegex = /^#(?:[0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/

export const getZodError = (error: any): string => (
    error.errors[0].message
)

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
