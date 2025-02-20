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

function Register() {
    const router = useRouter()
    const [register, { error }] = useRegisterVisitorMutation({
        onCompleted: data => {
            if (data?.registerVisitor?.success === true) {
                toast.success('Un email vous a été envoyé')
                router.push('/auth/email-submission-confirmation')
            } else {
                toast.error(
                    "Erreur lors de l'inscription: Vérifiez vos informations."
                )
            }
        },
        onError: error => {
            toast.error(`Erreur lors de l'inscription: ${error.message}`)
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
        const formData = new FormData(e.currentTarget)

        // Nettoyage des données
        const data: EmailInput = {
            email: (formData.get('email') as string).trim(),
        }

        // Vérification des champs
        if (!data.email) {
            toast.error('Merci de renseigner votre email.')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!data.email || !emailRegex.test(data.email)) {
            toast.error("L'email est invalide.")
            return
        }

        try {
            await register({ variables: { data } })
        } catch (err) {
            console.error("Erreur lors de l'envoi de l'email", err)
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
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() =>
                                toast.error("Échec de l'inscription Google")
                            }
                        />

                        <Link href={'/auth/login'}>
                            Déjà un compte ? Connectez-vous
                        </Link>
                        <button type='submit' className='btn-secondary'>
                            Créer un compte
                        </button>
                    </form>
                </div>
            </section>
        </Layout>
    )
}

export default Register
