import { Resolver, Arg, Query, Mutation, Ctx } from 'type-graphql'
import {
    User,
    UserWoPassword,
    ResponseMessage,
    InputLogin,
    InputRegisterValidation,
    EmailInput,
    InputUpdateUser,
    UpdatePasswordInput,
    isGoogleUser,
    InputPasswordGoogleUser,
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
import bcrypt from 'bcrypt'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const url = process.env.SITE_URL || 'http://localhost:3000'

export async function findUserByEmail(email: string) {
    return await User.findOne({
        where: { email },
    })
}

export async function findUserById(id: number) {
    return await User.findOne({
        where: { id },
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
    @Query(() => [UserWoPassword])
    async users(): Promise<UserWoPassword[]> {
        const users = await User.find()
        return plainToInstance(UserWoPassword, users)
    }

    @Query(() => UserWoPassword, { nullable: true })
    async userById(@Arg('id') id: number): Promise<UserWoPassword | null> {
        return await User.findOne({ where: { id } })
    }

    @Query(() => UserWoPassword, { nullable: true })
    async getUserFromCtx(
        @Ctx() ctx: MyContext
    ): Promise<UserWoPassword | null> {
        if (!ctx.user) {
            return null
        }

        // Retourner l'utilisateur sous le type UserWoPassword
        return plainToInstance(UserWoPassword, ctx.user)
    }

    @Mutation(() => UserWoPassword)
    async updateUser(
        @Arg('data', { validate: true }) data: InputUpdateUser,
        @Ctx() ctx: MyContext
    ) {
        if (!ctx.user) {
            throw new GraphQLError("L'utilisateur n'est pas authentifié")
        }

        const user = await User.findOne({ where: { id: ctx.user.id } })
        if (!user) {
            throw new GraphQLError('Utilisateur non trouvé')
        }

        let isUpdated = false

        if (data.email && data.email !== user.email) {
            const existingUser = await User.findOne({
                where: { email: data.email },
            })
            if (existingUser && existingUser.id !== user.id) {
                throw new GraphQLError('Cet email est déjà utilisé')
            }
            user.email = data.email
            isUpdated = true
        }

        if (data.first_name && data.first_name !== user.first_name) {
            user.first_name = data.first_name
            isUpdated = true
        }

        if (data.last_name && data.last_name !== user.last_name) {
            user.last_name = data.last_name
            isUpdated = true
        }

        if (isUpdated) {
            await user.save()
        }

        return plainToInstance(UserWoPassword, user) // 🔥 Retourne directement l'objet User
    }

    @Query(() => ResponseMessage)
    async login(
        @Arg('infos', { validate: true }) infos: InputLogin,
        @Ctx() ctx: MyContext
    ) {
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
            const accessToken = await new SignJWT({ id: user.id })
                .setProtectedHeader({ alg: 'HS256', typ: 'jwt' })
                .setExpirationTime('2h')
                .sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`))

            const cookies = new Cookies(ctx.req, ctx.res)
            // cookies.set('accessToken', accessToken, { httpOnly: true })

            cookies.set('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Assurez-vous que votre app utilise HTTPS en prod
                sameSite:
                    process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' pour cross-origin, 'lax' pour local
                domain:
                    process.env.NODE_ENV === 'production'
                        ? '.caudrel.com'
                        : undefined, // Domaine en prod
                path: '/', // Le cookie sera accessible pour toutes les routes
            })

            responseMessage.message = 'Bienvenue!'
            responseMessage.success = true
        } else {
            responseMessage.message = 'Vérifiez vos informations'
            responseMessage.success = false
        }

        return responseMessage
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
            const jwtToken = await new SignJWT({ id: user.id })
                .setProtectedHeader({ alg: 'HS256', typ: 'jwt' })
                .setExpirationTime('2h')
                .sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`))

            // Stockage du token dans les cookies
            const cookies = new Cookies(ctx.req, ctx.res)
            cookies.set('accessToken', jwtToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? true : false,
                sameSite:
                    process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
                domain:
                    process.env.NODE_ENV === 'production'
                        ? '.caudrel.com'
                        : 'localhost',
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
                secure: process.env.NODE_ENV === 'production',
                sameSite:
                    process.env.NODE_ENV === 'production' ? 'none' : 'lax', // `none` pour cross-origin, `lax` pour local
                expires: new Date(0), // Expirer immédiatement
                domain:
                    process.env.NODE_ENV === 'production'
                        ? '.caudrel.com'
                        : 'localhost',
            })
        }

        return true
    }

    @Mutation(() => ResponseMessage)
    async registerVisitor(
        @Arg('data', { validate: true }) data: EmailInput
    ): Promise<ResponseMessage> {
        const { email } = data
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
            <p>Ce lien est valable 1h.</p>
            <p>Passé ce délais, veuillez renouveler l'opération.</p>
        `

        const messageText = `
            Finalisez votre inscription en cliquant sur le lien suivant : ${confirmationLink}
            Ou copiez et collez ce lien dans votre navigateur : ${confirmationLink}
            Ce lien est valable 1h.
            Passé ce délais, veuillez renouveler l'opération.
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
        @Arg('data', { validate: true }) data: InputRegisterValidation
    ): Promise<ResponseMessage> {
        const {
            token,
            first_name,
            last_name,
            password,
            validated_consent_cgu,
        } = data

        const email = await redis.get(`register:${token}`)

        if (!email) {
            throw new Error("Lien d'inscription invalide ou expiré.")
        }

        // Vérifier si la date est bien valide
        const consentDate = new Date(validated_consent_cgu)
        if (isNaN(consentDate.getTime())) {
            throw new Error('La date de validation des CGU est invalide.')
        }

        // Création du nouvel utilisateur
        const newUser = User.create({
            email,
            first_name,
            last_name,
            password,
            role: 'visitor',
            validated_email: new Date(),
            validated_consent_cgu: consentDate, // ✅ Conversion sécurisée
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
        @Arg('data', { validate: true }) data: EmailInput
    ): Promise<ResponseMessage> {
        const { email } = data
        const responseMessage = new ResponseMessage()
        responseMessage.success = true
        responseMessage.message =
            'Si cet email existe, un lien de réinitialisation a été envoyé.'

        const user = await User.findOne({ where: { email } })
        if (!user) return responseMessage // Ne pas révéler si l'email existe

        const resetToken = crypto.randomBytes(32).toString('hex')
        const hashedToken = await bcrypt.hash(resetToken, 10)

        user.resetToken = hashedToken
        user.resetTokenExpires = new Date(Date.now() + 3600000) // Expire dans 1h
        await user.save()

        const resetUrl = `${url}/auth/reset-password?token=${resetToken}`

        await sendMail({
            Messages: [
                {
                    From: {
                        Name: 'EasyGift',
                        Email:
                            process.env.EMAIL_FROM ||
                            'caudrelportfolio@gmail.com',
                    },
                    To: [{ Name: '', Email: email }],
                    Subject: 'Réinitialisation du mot de passe',
                    TextPart: `Cliquez ici pour réinitialiser votre mot de passe: ${resetUrl}`,
                    HTMLPart: `<a href="${resetUrl}">Réinitialiser mon mot de passe</a>`,
                },
            ],
        })
        return responseMessage
    }

    @Mutation(() => ResponseMessage)
    async resetPassword(
        @Arg('resetToken') resetToken: string,
        @Arg('newPassword') newPassword: string
    ): Promise<ResponseMessage> {
        const user = await User.findOne({ where: { resetToken } })
        if (!user) {
            throw new Error('Le token est invalide ou a expiré')
        }

        user.password = newPassword
        user.resetToken = null
        await user.save()

        return {
            success: true,
            message: 'Mot de passe réinitialisé avec succès',
        }
    }

    @Mutation(() => ResponseMessage)
    async deleteUser(@Ctx() ctx: MyContext) {
        if (!ctx.user) {
            throw new GraphQLError("L'utilisateur n'est pas authentifié")
        }

        const user = await User.findOne({ where: { id: ctx.user.id } })

        if (!user) {
            throw new GraphQLError('Utilisateur non trouvé')
        }

        await User.remove(user) // Suppression de l'utilisateur

        const cookies = new Cookies(ctx.req, ctx.res)
        cookies.set('accessToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            expires: new Date(0),
            domain:
                process.env.NODE_ENV === 'production'
                    ? '.caudrel.com'
                    : 'localhost',
        })

        return {
            success: true,
            message: 'Votre compte a été supprimé avec succès',
        }
    }

    @Mutation(() => ResponseMessage)
    async updatePassword(
        @Arg('data', { validate: true }) data: UpdatePasswordInput,
        @Ctx() ctx: MyContext
    ): Promise<ResponseMessage> {
        if (!ctx.user) {
            throw new GraphQLError("L'utilisateur n'est pas authentifié")
        }

        const user = await User.findOne({ where: { id: ctx.user.id } })
        if (!user) {
            throw new GraphQLError('Utilisateur non trouvé')
        }

        // Vérification de l'ancien mot de passe
        if (!(await argon2.verify(user.password, data.oldPassword))) {
            throw new GraphQLError("L'ancien mot de passe est incorrect")
        }

        // Vérification des nouveaux mots de passe
        if (data.newPassword !== data.confirmNewPassword) {
            throw new GraphQLError(
                'Les nouveaux mots de passe ne correspondent pas'
            )
        }

        // Mise à jour du mot de passe (il sera hashé automatiquement par @BeforeUpdate)
        user.password = await argon2.hash(data.newPassword)
        await user.save()
        await User.update(user.id, { password: data.newPassword })

        return {
            success: true,
            message: 'Votre mot de passe a été mis à jour avec succès',
        }
    }

    @Query(() => Boolean)
    async userHasPassword(@Ctx() ctx: MyContext): Promise<boolean> {
        if (!ctx.user) {
            throw new GraphQLError("L'utilisateur n'est pas authentifié")
        }

        const user = await User.findOne({
            where: { id: ctx.user.id },
            select: ['password'], // Ne récupérer que le champ `password`
        })

        if (!user) {
            throw new GraphQLError('Utilisateur non trouvé')
        }

        return !!user.password // Retourne directement un booléen
    }

    @Query(() => isGoogleUser)
    async isGoogleUser(@Ctx() ctx: MyContext): Promise<isGoogleUser> {
        if (!ctx.user) {
            throw new GraphQLError("L'utilisateur n'est pas authentifié")
        }

        const user = await User.findOne({
            where: { id: ctx.user.id }, // Ne récupérer que le champ `password`
        })

        if (!user) {
            throw new GraphQLError('Utilisateur non trouvé')
        }

        return plainToInstance(isGoogleUser, user)
    }

    @Mutation(() => Boolean)
    async setPasswordForGoogleUser(
        @Arg('data', { validate: true }) data: InputPasswordGoogleUser
    ): Promise<boolean> {
        const { email, newPassword } = data
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw new GraphQLError('Utilisateur non trouvé')
        }

        user.password = await bcrypt.hash(newPassword, 10) // Hachage du mot de passe
        user.authProvider = 'local' // Assure-toi de modifier le fournisseur d'authentification si nécessaire
        await user.save()

        return true
    }
}

export default UsersResolver
