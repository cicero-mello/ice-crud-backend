import { readFile, writeFile } from "fs/promises"
import { resolve } from "path"

const ENUMS_DIVIDER = "// -- ENUMS divisor | don't delete this line --"

const prismaPath = resolve("prisma/schema.prisma")
const enumsPath = resolve("src/enums/index.ts")

const removeExportAndCommas = (content: string) => (
    content.replace(/export\s+/g, "").replace(/,\s*/g, "\n")
)

const addIndentationToEnums = (enumContent: string) => {
    const lines = enumContent.split("\n").map(line => {
        const trimmed = line.trim()

        if (trimmed.includes("{") || trimmed.includes("}")) {
            return trimmed
        }

        return trimmed === "" ? trimmed : `    ${trimmed}`
    })
    lines.pop()
    return lines.join("\n")
}

const removeLinesBelowSeparator = async (filePath: string, separator: string) => {
    try {
        const fileContent = await readFile(filePath, "utf-8")
        const lines = fileContent.split("\n")
        const separatorIndex = lines.findIndex(line => line.includes(separator))

        if (separatorIndex !== -1) {
            const newContent = lines.slice(0, separatorIndex + 1).join("\n")

            await writeFile(filePath, newContent, "utf-8")
            return
        }
        throw new Error(`Separator "${separator}" not found.`)
    } catch (error) {
        console.error("Error removing lines below separator:", error)
    }
}

const updatePrismaSchema = async () => {
    try {
        const enumsContent = await readFile(enumsPath, "utf-8")

        let cleanedEnumsContent = removeExportAndCommas(enumsContent)
        cleanedEnumsContent = addIndentationToEnums(cleanedEnumsContent)

        await removeLinesBelowSeparator(prismaPath, ENUMS_DIVIDER)

        const prismaSchemaContent = await readFile(prismaPath, "utf-8")
        const dividerIndex = prismaSchemaContent.indexOf(ENUMS_DIVIDER)

        if (dividerIndex === -1) {
            throw new Error(
                `Enums Divider (${ENUMS_DIVIDER}) not found in schema.prisma.`
            )
        }

        const beforeDivider = prismaSchemaContent.slice(
            0, dividerIndex + ENUMS_DIVIDER.length
        )
        const afterDivider = prismaSchemaContent.slice(
            dividerIndex + ENUMS_DIVIDER.length
        )

        const updatedSchemaContent = (
            `${beforeDivider}\n${cleanedEnumsContent}\n${afterDivider.trim()}`
        )

        await writeFile(prismaPath, updatedSchemaContent, "utf-8")

        console.log("👽 schema.prisma updated with enums!")
    } catch (error) {
        console.error("Error updating schema.prisma:", error)
    }
}

updatePrismaSchema()
