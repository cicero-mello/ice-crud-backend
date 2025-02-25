import crypto from 'crypto'

export const generateSalt = (bytes: number = 8) => {
    return crypto.randomBytes(bytes).toString('hex')
}

export const generateHash = (content: string, salt: string) => {
    //TODO - Increase Iterations Later
    const iterations = 10
    const keyLength = 32
    const digestAlgorithm = "sha512"

    const hash = crypto.pbkdf2Sync(
        content, salt, iterations, keyLength, digestAlgorithm
    )

    return hash.toString("hex")
}
