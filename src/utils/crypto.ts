import crypto from 'crypto'
import * as dotenv from "dotenv"

dotenv.config()

export const generateSalt = (bytes: number = 8) => {
    return crypto.randomBytes(bytes).toString('hex')
}

export const generateHash = (content: string, salt: string) => {
    const iterations = Number(process.env.GENERATE_HASH_ITERATIONS) ?? 10
    const keyLength = 32
    const digestAlgorithm = "sha512"

    const hash = crypto.pbkdf2Sync(
        content, salt, iterations, keyLength, digestAlgorithm
    )

    return hash.toString("hex")
}
