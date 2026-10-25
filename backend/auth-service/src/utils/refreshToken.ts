import { createHash, randomBytes } from "node:crypto";

export const generateRefreshToken = (): string => {
    const token = randomBytes(32);
    return token.toString('hex')
}

// generate  sha 256 hash of the refresh token
export const hashRefreshToken = (token: string): string => {
    return createHash('sha256').update(token).digest('hex')
}
// Hinglish: SHA-256 kisi bhi input ko ek fixed-length hash mein convert karta hai. Hashing one-way process hai, matlab hash se original token ko practically recover nahi kar sakte.

// a refresh token utility is genaret a tokenb and has it but we need somewhere to store the session details

// session model ek record rakhega ki kaunsa user login  hai uska refresh token hash kya hai  session kab expire hoga aur logout hua hai ya nahi

