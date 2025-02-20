import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { useGetRoleLazyQuery } from '../src/graphql/generated/schema'

interface Payload {
    email: string
}

const SECRET_KEY = process.env.SECRET_KEY || ''

export default async function middleware(request: NextRequest) {
    const { cookies } = request
    const accessToken = cookies.get('accessToken')
    const refreshToken = cookies.get('refreshToken')

    // Vérification du token d'accès et éventuellement du refresh token
    return await checkToken(accessToken?.value, refreshToken?.value, request)
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

export async function checkRole(): Promise<string | null> {
    try {
        // 📌 Récupération des cookies côté navigateur
        const cookies = new Map(
            document.cookie.split('; ').map(c => {
                const [key, value] = c.split('=')
                return [key, value]
            })
        )
        const accessToken = cookies.get('accessToken')

        // 🚫 Aucun token trouvé ou token invalide
        if (!accessToken) {
            console.warn('⚠️ Aucun token trouvé dans les cookies.')
            return null
        }

        // ✅ Vérification du accessToken avec la fonction verify()
        const payload = await verify(accessToken)

        // ❌ Token invalide
        if (!payload?.email) {
            console.warn('⚠️ Token invalide ou expiré.')
            return null
        }

        // ✅ Appel GraphQL pour récupérer le rôle
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`, // Envoi du token dans l'en-tête
            },
            body: JSON.stringify({
                query: `
                    query {
                        getRole
                    }
                `,
            }),
        })

        const data = await response.json()

        // Retourne le rôle de l'utilisateur depuis la réponse GraphQL
        return data?.data?.getRole ? 'admin' : 'user'
    } catch (error) {
        console.error('🚨 Erreur dans checkRole():', error)
        return null
    }
}

async function checkToken(
    accessToken: string | undefined,
    refreshToken: string | undefined,
    request: NextRequest
) {
    let response: NextResponse<unknown>

    // Si aucun des tokens n'est présent
    if (!accessToken && !refreshToken) {
        if (request.nextUrl.pathname.startsWith('/admin')) {
            response = NextResponse.redirect(
                new URL('/auth/login', request.url)
            )
        } else {
            response = NextResponse.next()
        }
        response.cookies.delete('email')
        return response
    }

    // Si le accessToken est présent
    if (accessToken) {
        try {
            const payload = await verify(accessToken)

            if (!payload || !payload.email) {
                response = NextResponse.redirect(
                    new URL('/auth/login', request.url)
                )
                response.cookies.delete('accessToken') // ✅ Supprime le token expiré
                return response
            }

            response = NextResponse.next()
            response.cookies.set('email', payload.email)
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
            return response
        }
    }

    // Si seul le refreshToken est présent, essayer de le vérifier
    if (refreshToken) {
        try {
            const payload = await verify(refreshToken)

            if (!payload || !payload.email) {
                response = NextResponse.redirect(
                    new URL('/auth/login', request.url)
                )
                response.cookies.delete('refreshToken') // ✅ Supprime le refreshToken expiré
                return response
            }

            // Si le refreshToken est valide, tu peux générer un nouvel accessToken ici si besoin

            response = NextResponse.next()
            response.cookies.set('email', payload.email)
            return response
        } catch (err) {
            console.error(
                '🚨 Erreur lors de la vérification du refreshToken:',
                err
            )

            response = NextResponse.redirect(
                new URL('/auth/login', request.url)
            )
            response.cookies.delete('refreshToken') // ✅ Supprime le refreshToken expiré
            return response
        }
    }

    // Si aucun des cas précédents n'est validé, on continue normalement
    response = NextResponse.next()
    return response
}
