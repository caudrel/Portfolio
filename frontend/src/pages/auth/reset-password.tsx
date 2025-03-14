import { useState } from 'react'
import { useRouter } from 'next/router'
import {
    useIsGoogleUserQuery,
    useResetPasswordMutation,
    useSetPasswordForGoogleUserMutation,
} from '@/graphql/generated/schema'
import { toast } from 'react-toastify'
import Layout from '@/components/Layout'

function ResetPassword() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const { token } = router.query
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [resetPassword] = useResetPasswordMutation()
    const {
        data: dataGoogleUser,
        loading: loadingGoogleUser,
        error: errorGoogleUser,
    } = useIsGoogleUserQuery()
    const [setPasswordForGoogleUser] = useSetPasswordForGoogleUserMutation()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password.length < 8) {
            setErrorMessage(
                'Le mot de passe doit contenir au moins 8 caractères'
            )
            toast.error('Le mot de passe doit contenir au moins 8 caractères')
            return
        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/
        if (!passwordRegex.test(password)) {
            setErrorMessage(
                'Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial'
            )
            toast.error(
                'Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial'
            )
            return
        }

        if (password !== confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas')
            toast.error('Les mots de passe ne correspondent pas')
            return
        }

        if (!token) {
            // Si pas de token, vérifier si l'utilisateur est un utilisateur Google
            if (dataGoogleUser?.isGoogleUser.authProvider === 'google') {
                const result = await setPasswordForGoogleUser({
                    variables: {
                        data: {
                            // Envelopper dans un objet "data"
                            email: dataGoogleUser.isGoogleUser.email, // L'email de l'utilisateur Google
                            newPassword: password, // Nouveau mot de passe
                        },
                    },
                })

                if (result.data?.setPasswordForGoogleUser) {
                    toast.success('Mot de passe défini avec succès!')
                    router.push('/mon-compte')
                } else {
                    toast.error('Erreur lors de la définition du mot de passe')
                }
            } else {
                toast.error(
                    "Vous devez d'abord demander un lien de réinitialisation."
                )
                router.push('/auth/forgot-password')
            }
            return
        }

        // Cas classique avec un token de réinitialisation
        const result = await resetPassword({
            variables: {
                resetToken: token as string,
                newPassword: password,
            },
        })
        if (result.data?.resetPassword.success) {
            toast.success('Mot de passe réinitialisé avec succès!')
            router.push('/auth/login')
        } else {
            toast.error('Erreur lors de la réinitialisation du mot de passe')
        }
    }

    return (
        <Layout title='Modification du mot de passe - Portfolio CAudrel'>
            <section className='login'>
                {dataGoogleUser?.isGoogleUser.authProvider === 'google' ? (
                    <h1>Créer un mot de passe</h1>
                ) : (
                    <h1>Enregistrer un nouveau mot de passe</h1>
                )}
                <div>{errorMessage && <p className=''>{errorMessage}</p>}</div>
                <div className='form-frame'>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='labels'>
                            <div className='label'>
                                <label htmlFor='password'>
                                    Nouveau mot de passe
                                </label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='label'>
                                <label htmlFor='confirmPassword'>
                                    Confirmez le mot de passe
                                </label>
                                <input
                                    type='password'
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={e =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className='form-validation'>
                            <button type='submit' className='btn-secondary'>
                                {dataGoogleUser?.isGoogleUser.authProvider ===
                                'google'
                                    ? 'Enregistrer'
                                    : 'Réinitialiser'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    )
}

export default ResetPassword
