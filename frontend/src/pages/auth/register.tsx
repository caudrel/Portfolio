import { useState } from 'react'
import {
    useRegisterVisitorMutation,
    useGoogleAuthMutation,
    EmailInput,
} from '@/graphql/generated/schema'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { toast } from 'react-toastify'
import { getConstraints } from '@/lib/utils'
import { GoogleLogin } from '@react-oauth/google'
import Image from 'next/image'

function Register() {
    const router = useRouter()
    const [cguAccepted, setCguAccepted] = useState(false) // ✅ Suivi de la case à cocher
    const [cguError, setCguError] = useState(false)

    // Remplacer le console.log par console.warn ou console.error
    console.warn('cguError', cguError)

    const [register, { error }] = useRegisterVisitorMutation({
        onCompleted: data => {
            if (data?.registerVisitor?.success === true) {
                toast.success('Un email vous a été envoyé')
                router.push('/auth/email-submission-confirmation')
            } else {
                toast.error(
                    'Erreur lors de l&apos;inscription: Vérifiez vos informations.'
                )
            }
        },
        onError: error => {
            toast.error(`Erreur lors de l&apos;inscription: ${error.message}`)
        },
    })

    const validationErrors =
        error?.graphQLErrors[0]?.extensions?.validationErrors
    const errorMessages = validationErrors
        ? getConstraints(validationErrors)
        : []

    const [googleAuth] = useGoogleAuthMutation()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!cguAccepted) {
            setCguError(true) // Affiche un message d'erreur
            console.warn('clic') // Le log ici doit être appelé si la case CGU n&apos;est pas cochée
            toast.error('Veuillez accepter les CGU avant de continuer.')
            return
        }

        setCguError(false) // Réinitialise l&apos;erreur si la case est cochée

        const formData = new FormData(e.currentTarget)

        const data: EmailInput = {
            email: (formData.get('email') as string).trim(),
        }

        if (!data.email) {
            toast.error('Merci de renseigner votre email.')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(data.email)) {
            toast.error('L&apos;email est invalide.')
            return
        }

        try {
            await register({ variables: { data } })
        } catch (err) {
            console.error('Erreur lors de l&apos;envoi de l&apos;email', err)
        }
    }

    const handleGoogleLogin = async (response: any) => {
        const googleToken = response.credential

        try {
            const { data } = await googleAuth({
                variables: { token: googleToken },
            })

            if (data?.googleAuth?.success) {
                toast.success('Connexion réussie avec Google!')
                router.push('/')
            } else {
                toast.error('Erreur lors de la connexion avec Google')
            }
        } catch (err) {
            console.error('Erreur Google Auth', err)
            toast.error('Erreur lors de la connexion avec Google')
        }
    }

    return (
        <Layout title='Créer un compte - Portfolio CAudrel'>
            <section className='login'>
                <h1>Création de compte</h1>

                {/* Affichage des erreurs de validation GraphQL */}
                {errorMessages && errorMessages.length > 0 && (
                    <div className='error-messages'>
                        {errorMessages.map((item, index) =>
                            Object.values(item).map((value, valueIndex) => (
                                <p
                                    key={`${index}-${valueIndex}`}
                                    className='text-red-600'
                                >
                                    {value as React.ReactNode}
                                </p>
                            ))
                        )}
                    </div>
                )}

                <div className='form-frame'>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='labels'>
                            <div className='label'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    id='email'
                                    type='email'
                                    name='email'
                                    required
                                />
                            </div>
                        </div>

                        {/* ✅ Case à cocher CGU */}
                        <div className='checkbox'>
                            <label htmlFor='cgu'>
                                <input
                                    type='checkbox'
                                    id='cgu'
                                    name='cgu'
                                    checked={cguAccepted}
                                    onChange={e => {
                                        setCguAccepted(e.target.checked)
                                        setCguError(false) // Cache l&apos;erreur si l&apos;utilisateur coche la case
                                    }}
                                />
                                <span className='custom-checkbox'></span>
                                J&apos;accepte les CGU
                                <Link href={'/cgu'}>(disponibles ici)</Link>
                            </label>
                            {cguError && (
                                <p className='text-red-600'>
                                    Vous devez accepter les CGU.
                                </p>
                            )}
                        </div>

                        <div className='google-login-wrapper'>
                            {cguAccepted ? (
                                <GoogleLogin
                                    onSuccess={handleGoogleLogin}
                                    onError={() =>
                                        console.error('Erreur Google Auth')
                                    }
                                />
                            ) : (
                                <button
                                    className='google-disabled-btn'
                                    type='button'
                                    onClick={() => {
                                        toast.error(
                                            'Veuillez accepter les CGU avant de continuer.'
                                        )
                                    }}
                                >
                                    <Image
                                        src={'/icons/google-icon.svg'}
                                        width={500}
                                        height={500}
                                        alt='Google'
                                        priority
                                    />
                                    Se connecter avec Google
                                </button>
                            )}
                        </div>

                        <Link href={'/auth/login'}>
                            Déjà un compte ? Connectez-vous !
                        </Link>

                        {!cguAccepted ? (
                            <div className='form-validation'>
                                <button
                                    type='button'
                                    className='btn-secondary btn-disabled'
                                    onClick={() => {
                                        toast.error(
                                            'Veuillez accepter les CGU avant de continuer.'
                                        )
                                    }}
                                >
                                    Créer un compte
                                </button>
                            </div>
                        ) : (
                            <div className='form-validation'>
                                <button type='submit' className='btn-secondary'>
                                    Créer un compte
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </section>
        </Layout>
    )
}

export default Register
