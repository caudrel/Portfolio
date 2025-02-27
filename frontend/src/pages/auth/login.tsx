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

    //login classique
    const [login, { data, error }] = useLoginLazyQuery({
        onCompleted: () => {
            router.push('/')
        },
    })

    useEffect(() => {
        if (data) {
            if (data.login.success) {
                toast.success('Connexion réussie!')
            } else {
                toast.error(
                    'Erreur lors de la connexion: Vérifiez vos informations'
                )
            }
        }

        if (error) {
            console.error('error', error)
            toast.error(`Erreur lors de la connexion: ${error.message}`)
        }
    }, [data, error])

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
        await login({
            variables: {
                infos: {
                    email: loginData.email,
                    password: loginData.password,
                },
            },
        }).then(() => {
            router.push('/')
        })
    }
    const [googleAuth] = useGoogleAuthMutation()
    // Mutation pour la connexion avec Google
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
        <Layout title='Login - Portfolio CAudrel'>
            <section className='login'>
                <h1 className=''>Connexion</h1>
                <div>{errorMessage && <p className=''>{errorMessage}</p>}</div>
                <div className='form-frame'>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='labels'>
                            <div className='label'>
                                <label htmlFor='email'>
                                    <span className=''>Email</span>
                                </label>
                                <input
                                    data-testid='login-email'
                                    id='email'
                                    type='email'
                                    name='email'
                                    required
                                />
                            </div>
                            <div className='label'>
                                <label
                                    htmlFor='password'
                                    className='text-sm font-medium text-muted-foreground'
                                >
                                    <span>Mot de passe</span>
                                </label>
                                <input
                                    data-testid='login-password'
                                    id='password'
                                    type='password'
                                    name='password'
                                    required
                                />
                            </div>
                        </div>
                        <div className='form-validation'>
                            <button
                                data-testid='login-button'
                                type='submit'
                                className='btn-secondary'
                            >
                                {'Se connecter'}
                            </button>
                        </div>

                        <Link href={'/auth/register'} className=''>
                            Pas encore de compte ?
                        </Link>

                        <Link href={'/auth/forgot-password'} className=''>
                            J'ai oublié mon mot de passe 🤭
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
