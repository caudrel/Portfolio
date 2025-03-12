import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import {
    useGetUserFromCtxQuery,
    UserWoPassword,
} from '../src/graphql/generated/schema'

interface Payload {
    id: number
}

const SECRET_KEY = process.env.SECRET_KEY || ''

export default async function middleware(request: NextRequest) {
    const { cookies } = request

    const accessToken = cookies.get('accessToken')

    return await checkToken(accessToken?.value, request)
}

export async function verify(token: string): Promise<Payload | null> {
    try {
        const { payload } = await jwtVerify<Payload>(
            token,
            new TextEncoder().encode(SECRET_KEY)
        )
        return payload
    } catch (error) {
        if ((error as any).code === 'ERR_JWT_EXPIRED') {
            console.warn('⚠️ Token expiré, suppression du cookie...')
        } else {
            console.error('🚨 Erreur lors de la vérification du token:', error)
        }
        return null
    }
}

async function checkToken(
    accessToken: string | undefined,
    request: NextRequest
) {
    let response: NextResponse<unknown>

    if (!accessToken) {
        const restrictedPaths = ['/admin', '/mon-compte']
        if (
            restrictedPaths.some(path =>
                request.nextUrl.pathname.startsWith(path)
            )
        ) {
            response = NextResponse.redirect(
                new URL('/auth/login', request.url)
            )
        } else {
            response = NextResponse.next()
        }
        response.cookies.delete('accessToken')
        response.cookies.delete('id')
        return response
    }

    // Vérification du token
    const payload = await verify(accessToken)

    if (!payload || !payload.id) {
        response = NextResponse.redirect(new URL('/', request.url)) // ⬅️ 🔥 Redirige vers la home
        response.cookies.delete('accessToken')
        response.cookies.delete('id')
        return response
    }

    response = NextResponse.next()
    response.cookies.set('id', payload.id.toString()) // Met à jour l'id si nécessaire
    return response
}
