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
