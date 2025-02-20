import { Resolver, Arg, Query, Mutation, Ctx } from 'type-graphql'
import { Not, IsNull } from 'typeorm'
import {
    User,
    UserWOPassword,
    ResponseMessage,
    InputLogin,
    InputRegisterValidation,
    EmailInput,
} from '../entities/user'
import * as argon2 from 'argon2'
import { MyContext } from '..'
import Cookies from 'cookies'
import { SignJWT } from 'jose'
import { GraphQLError } from 'graphql'
import { plainToInstance } from 'class-transformer'
import { OAuth2Client } from 'google-auth-library'
import sendMail from '../mailer'
import crypto from 'crypto'
import redis from '../lib/redis'
import { v4 as uuidv4 } from 'uuid'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const url = process.env.SITE_URL || 'http://localhost:3000'

export async function findUserByEmail(email: string) {
    return await User.findOne({
        where: { email },
    })
}

export async function createUser({
    first_name,
    last_name,
    email,
    password,
    authProvider = 'local',
}: {
    first_name?: string
    last_name?: string
    email: string
    password?: string
    authProvider?: 'local' | 'google'
}) {
    const newUser = await User.create({
        first_name,
        last_name,
        email,
        password,
        authProvider,
    }).save()

    return newUser
}

@Resolver(User)
class UsersResolver {
    @Query(() => [UserWOPassword])
    async users(): Promise<UserWOPassword[]> {
        const users = await User.find()
        return plainToInstance(UserWOPassword, users)
    }

    @Query(() => [UserWOPassword])
    async getRole(@Ctx() ctx: MyContext): Promise<boolean> {
        const role = ctx.user?.role
        return role === 'admin'
    }

    @Query(() => ResponseMessage)
    async login(@Arg('infos') infos: InputLogin, @Ctx() ctx: MyContext) {
        const user = await findUserByEmail(infos.email)

        if (!user) {
            throw new GraphQLError(`Veuillez vérifier vos informations`)
        }

        const isPasswordValid = await argon2.verify(
            user.password,
            infos.password
        )

        const responseMessage = new ResponseMessage()
        if (isPasswordValid) {
            const accessToken = await new SignJWT({ email: user.email })
                .setProtectedHeader({ alg: 'HS256', typ: 'jwt' })
                .setExpirationTime('2h')
                .sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`))

            const refreshToken = await new SignJWT({ email: user.email })
                .setProtectedHeader({ alg: 'HS256', typ: 'jwt' })
                .setExpirationTime('7d')
                .sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`))

            user.refreshToken = await argon2.hash(refreshToken)
            await user.save()

            const cookies = new Cookies(ctx.req, ctx.res)
            cookies.set('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                // sameSite: 'none', // Pour les cookies cross-origin en dev
            })
            cookies.set('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                // sameSite: 'none', // Pour les cookies cross-origin en dev
            })

            responseMessage.message = 'Bienvenue!'
            responseMessage.success = true
        } else {
            responseMessage.message = 'Vérifiez vos informations'
            responseMessage.success = false
        }

        return responseMessage
    }

    @Mutation(() => String)
    async refreshToken(@Ctx() ctx: MyContext): Promise<string> {
        const cookies = new Cookies(ctx.req, ctx.res)
        const refreshToken = cookies.get('refreshToken')

        if (!refreshToken) {
            throw new GraphQLError('Aucun refresh token trouvé.')
        }

        const user = await User.findOne({
            where: { refreshToken: Not(IsNull()) },
        })

        if (!user || !user.refreshToken) {
            throw new GraphQLError(
                'Utilisateur non trouvé ou refresh token manquant.'
            )
        }

        // Vérification du token
        const valid = await argon2.verify(user.refreshToken, refreshToken)
        if (!valid) {
            throw new GraphQLError('Refresh token invalide.')
        }

        // Génération du nouveau accessToken
        const newAccessToken = await new SignJWT({ email: user.email })
            .setProtectedHeader({ alg: 'HS256', typ: 'jwt' })
            .setExpirationTime('2h')
            .sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`))

        cookies.set('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            // sameSite: 'none', // Pour les cookies cross-origin en dev
        })

        return newAccessToken
    }

    @Mutation(() => ResponseMessage)
    async googleAuth(
        @Arg('token') token: string,
        @Ctx() ctx: MyContext
    ): Promise<ResponseMessage> {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            })
            const payload = ticket.getPayload()

            if (!payload) {
                throw new Error('Google token verification failed')
            }

            const { email, given_name, family_name } = payload

            // Récupérer ou créer l'utilisateur
            let user = await User.findOne({ where: { email } })
            if (!user) {
                // Création d'un nouvel utilisateur via Google
                user = await User.create({
                    first_name: given_name,
                    last_name: family_name,
                    email,
                    authProvider: 'google',
                    validated_email: new Date(), // Email validé par défaut
                }).save()
            } else {
                // Fusion des comptes locaux et Google
                if (user.authProvider !== 'google') {
                    user.authProvider = 'google'
                    await user.save()
                }
            }

            // Génération du token JWT
            const jwtToken = await new SignJWT({ email: user.email })
                .setProtectedHeader({ alg: 'HS256', typ: 'jwt' })
                .setExpirationTime('2h')
                .sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`))

            // Stockage du token dans les cookies
            const cookies = new Cookies(ctx.req, ctx.res)
            cookies.set('accessToken', jwtToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? true : false, // 🔄 Modifié ici
                sameSite:
                    process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // 🔄 Modifié ici
            })

            return {
                success: true,
                message: 'Authentification réussie avec Google',
            }
        } catch (error) {
            console.error("Erreur lors de l'authentification Google", error)
            throw new GraphQLError("Erreur lors de l'authentification Google")
        }
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() ctx: MyContext): Promise<boolean> {
        // Vérifie si un utilisateur est connecté
        if (ctx.user) {
            const cookies = new Cookies(ctx.req, ctx.res)

            // Réinitialiser les cookies token ici (ou supprime-les si nécessaire)
            cookies.set('accessToken', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // 🔒 Seulement en production
                sameSite: 'lax',
                // sameSite: 'none', // Pour les cookies cross-origin en dev
                expires: new Date(0), // Expirer immédiatement
            })

            cookies.set('refreshToken', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // 🔒 Seulement en production
                sameSite: 'lax',
                // sameSite: 'none', // Pour les cookies cross-origin en dev
                expires: new Date(0), // Expirer immédiatement
            })

            console.log(
                'Cookies après suppression:',
                cookies.get('accessToken'),
                cookies.get('refreshToken')
            )
        }

        // Autres logiques (par exemple, supprimer le token de la base de données)
        const user = await User.findOne({
            where: { refreshToken: Not(IsNull()) },
        })
        if (user) {
            user.refreshToken = null
            await user.save()
        }

        return true
    }

    @Mutation(() => ResponseMessage)
    async registerVisitor(
        @Arg('data') data: EmailInput
    ): Promise<ResponseMessage> {
        const { email } = data
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { email } })

        if (existingUser) {
            const loginUrl = `${process.env.FRONTEND_URL}/auth/login`

            const messageHtml = `
                <h1>Vous avez déjà un compte</h1>
                <p>Vous pouvez vous connecter dès maintenant en cliquant sur le lien ci-dessous :</p>
                <a href="${loginUrl}" style="color: #fff; background-color: #007bff; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Se connecter</a>
                <p>Ou copiez et collez ce lien dans votre navigateur : <br> ${loginUrl}</p>
            `

            const messageText = `
                Vous avez déjà un compte. Vous pouvez vous connecter dès maintenant en cliquant sur le lien suivant : ${loginUrl} 
                Ou copiez et collez ce lien dans votre navigateur : ${loginUrl}
            `

            await sendMail({
                Messages: [
                    {
                        From: {
                            Name: `${process.env.APP_NAME}`,
                            Email: `${process.env.EMAIL_FROM}`,
                        },
                        To: [{ Name: '', Email: email }],
                        Subject: 'Connexion à votre compte',
                        TextPart: messageText,
                        HTMLPart: messageHtml,
                    },
                ],
            })

            return {
                success: true,
                message: 'Email envoyé avec les instructions de connexion.',
            }
        }

        // Générer un token d'inscription
        const token = uuidv4()
        await redis.set(`register:${token}`, email, 'EX', 3600) // Expire en 1h

        const confirmationLink = `${process.env.SITE_URL}/auth/register-validation?token=${token}&email=${email}`

        const messageHtml = `
            <h1>Finalisez votre inscription</h1>
            <p>Veuillez compléter votre inscription en cliquant sur le lien ci-dessous :</p>
            <a href="${confirmationLink}" style="color: #fff; background-color: #28a745; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Finaliser mon inscription</a>
            <p>Ou copiez et collez ce lien dans votre navigateur : <br> ${confirmationLink}</p>
            <p>Ce lien est valable pour une durée limitée.</p>
        `

        const messageText = `
            Finalisez votre inscription en cliquant sur le lien suivant : ${confirmationLink}
            Ou copiez et collez ce lien dans votre navigateur : ${confirmationLink}
            Ce lien est valable pour une durée limitée.
        `

        await sendMail({
            Messages: [
                {
                    From: {
                        Name: `${process.env.APP_NAME}`,
                        Email: `${process.env.EMAIL_FROM}`,
                    },
                    To: [{ Name: '', Email: email }],
                    Subject: 'Finalisation de votre inscription',
                    TextPart: messageText,
                    HTMLPart: messageHtml,
                },
            ],
        })

        return { success: true, message: 'Email de confirmation envoyé.' }
    }

    @Mutation(() => ResponseMessage)
    async confirmRegister(
        @Arg('data') data: InputRegisterValidation
    ): Promise<ResponseMessage> {
        const { token, first_name, last_name, password } = data

        const email = await redis.get(`register:${token}`)

        if (!email) {
            throw new Error("Lien d'inscription invalide ou expiré.")
        }

        // Création du nouvel utilisateur avec le hash géré automatiquement
        const newUser = User.create({
            email,
            first_name,
            last_name,
            password,
            role: 'visitor',
            validated_email: new Date(),
            authProvider: 'local',
        })

        await newUser.save()
        await redis.del(`register:${token}`)

        return {
            success: true,
            message: 'Inscription réussie. Vous pouvez vous connecter.',
        }
    }

    @Mutation(() => ResponseMessage)
    async forgotPassword(
        @Arg('email') email: string
    ): Promise<ResponseMessage> {
        const responseMessage = new ResponseMessage()
        responseMessage.success = true
        responseMessage.message =
            'Si cet email existe, un lien de réinitialisation a été envoyé'

        const user = await User.findOne({ where: { email } })
        if (!user) {
            return responseMessage // Ne révèle pas si l'utilisateur existe
        }

        const resetToken = crypto.randomBytes(32).toString('hex')
        user.resetToken = resetToken
        await user.save()

        const resetUrl = `${url}/auth/reset-password?token=${resetToken}`
        const messageHtml = `
        <h1>Vous avez demandé une réinitialisation du mot de passe</h1>
        <p>Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe:</p>
        <a href="${resetUrl}">${resetUrl}</a>
    `
        const messageText = `
        Vous avez demandé une réinitialisation du mot de passe. Veuillez cliquer sur
        le lien suivant pour réinitialiser votre mot de passe: ${resetUrl}
    `

        try {
            await sendMail({
                Messages: [
                    {
                        From: {
                            Name: `${process.env.APP_NAME}`,
                            Email: `${process.env.EMAIL_FROM}`,
                        },
                        To: [{ Name: '', Email: email }],
                        Subject: 'Réinitialisation du mot de passe',
                        TextPart: messageText,
                        HTMLPart: messageHtml,
                    },
                ],
            })
        } catch (err) {
            console.error("Erreur lors de l'envoi de l'email:", err)
        }

        return responseMessage
    }

    @Mutation(() => ResponseMessage)
    async resetPassword(
        @Arg('token') token: string,
        @Arg('newPassword') newPassword: string
    ): Promise<ResponseMessage> {
        const user = await User.findOne({ where: { resetToken: token } })

        const responseMessage = new ResponseMessage()
        if (!user) {
            responseMessage.success = false
            responseMessage.message = 'Token invalide'
            return responseMessage
        }

        user.password = newPassword
        user.resetToken = null
        await user.save()

        responseMessage.success = true
        responseMessage.message = 'Mot de passe réinitialisé avec succès'
        return responseMessage
    }
}

export default UsersResolver
