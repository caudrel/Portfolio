import {
    InputLogin,
    useLoginLazyQuery,
    useGoogleAuthMutation,
} from '@/graphql/generated/schema'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google'

function Login() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // login classique
    const [login, { data, error, loading }] = useLoginLazyQuery({
        onCompleted: data => {
            if (data.login.success) {
                toast.success('Connexion réussie!')
                router.push('/')
            } else {
                toast.error(
                    'Erreur lors de la connexion: Vérifiez vos informations'
                )
            }
        },
        onError: error => {
            toast.error(`Erreur lors de la connexion: ${error.message}`)
        },
    })

    useEffect(() => {
        if (error) {
            setErrorMessage(error.message)
        }
    }, [error])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const loginData = Object.fromEntries(formData) as InputLogin
        loginData.email = loginData.email.trim()
        loginData.password = loginData.password.trim()

        if (!loginData.email || !loginData.password) {
            setErrorMessage('Veuillez renseigner tous les champs')
            return
        }

        setIsSubmitting(true)
        await login({
            variables: { infos: loginData },
        })
        setIsSubmitting(false)
    }

    // Connexion Google
    const [googleAuth] = useGoogleAuthMutation()

    const handleGoogleLogin = async (response: any) => {
        const googleToken = response?.credential
        if (!googleToken) {
            toast.error('Erreur: Aucun token Google trouvé')
            return
        }

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
        <Layout title='Login - Portfolio CAudrel'>
            <section className='login'>
                <h1>Connexion</h1>
                {errorMessage && <p className='error-text'>{errorMessage}</p>}

                <div className='form-frame'>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='labels'>
                            <div className='label'>
                                <label htmlFor='email'>
                                    <span>Email</span>
                                </label>
                                <input
                                    data-testid='login-email'
                                    id='email'
                                    type='email'
                                    name='email'
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className='label'>
                                <label htmlFor='password'>
                                    <span>Mot de passe</span>
                                </label>
                                <input
                                    data-testid='login-password'
                                    id='password'
                                    type='password'
                                    name='password'
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div className='form-validation'>
                            <button
                                type='submit'
                                className='btn-secondary'
                                disabled={isSubmitting || loading}
                            >
                                {isSubmitting || loading
                                    ? 'Connexion...'
                                    : 'Se connecter'}
                            </button>
                        </div>

                        <Link href={'/auth/register'}>
                            Pas encore de compte ?
                        </Link>
                        <Link href={'/auth/forgot-password'}>
                            J&apos;ai oublié mon mot de passe 🤭
                        </Link>

                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() =>
                                toast.error('Échec de la connexion Google')
                            }
                        />
                    </form>
                </div>
            </section>
        </Layout>
    )
}

export default Login
