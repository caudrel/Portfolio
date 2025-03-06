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

export async function ctxUser(): Promise<UserWoPassword | null> {
    const { data, loading, error } = useGetUserFromCtxQuery()
    if (loading) {
        return null
    }
    if (error) {
        console.error(error)
        return null
    }
    return data?.getUserFromCtx ?? null // Remplace par la réponse correcte si nécessaire
}

async function checkToken(
    accessToken: string | undefined,
    request: NextRequest
) {
    let response: NextResponse<unknown>

    // Si aucun des tokens n'est présent
    if (!accessToken) {
        if (request.nextUrl.pathname.startsWith('/admin')) {
            response = NextResponse.redirect(
                new URL('/auth/login', request.url)
            )
        } else {
            response = NextResponse.next()
        }
        response.cookies.delete('accessToken') // Supprimer le cookie accessToken
        response.cookies.delete('id') // Supprimer le cookie id s'il est utilisé
        return response
    }

    // Si le accessToken est présent
    if (accessToken) {
        try {
            const payload = await verify(accessToken)

            if (!payload || !payload.id) {
                response = NextResponse.redirect(
                    new URL('/auth/login', request.url)
                )
                response.cookies.delete('accessToken') // ✅ Supprime le token expiré
                response.cookies.delete('id') // Supprime l'id si nécessaire
                return response
            }

            response = NextResponse.next()
            response.cookies.set('id', payload.id.toString()) // Mettre à jour l'id si nécessaire
            return response
        } catch (err) {
            console.error(
                '🚨 Erreur lors de la vérification du accessToken:',
                err
            )

            response = NextResponse.redirect(
                new URL('/auth/login', request.url)
            )
            response.cookies.delete('accessToken') // ✅ Supprime le token expiré
            response.cookies.delete('id') // Supprime l'id si nécessaire
            return response
        }
    }

    // Si aucun des cas précédents n'est validé, on continue normalement
    response = NextResponse.next()
    return response
}
