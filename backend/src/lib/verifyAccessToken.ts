import { jwtVerify } from 'jose'

export default async function verifyAccessToken(token: string) {
    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.SECRET_KEY)
        )
        return payload
    } catch (error) {
        console.error('Invalid or expired token:', error)
        return null
    }
}
