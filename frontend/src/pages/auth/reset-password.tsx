import { useState } from 'react'
import { useRouter } from 'next/router'
import { useResetPasswordMutation } from '@/graphql/generated/schema'
import { toast } from 'react-toastify'
import Layout from '@/components/Layout'

function ResetPassword() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const { token } = router.query
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [resetPassword, { data, error }] = useResetPasswordMutation()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas')
            toast.error('Les mots de passe ne correspondent pas')
            return
        }
        try {
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
                toast.error(
                    'Erreur lors de la réinitialisation du mot de passe'
                )
            }
        } catch (error) {
            toast.error('Erreur lors de la réinitialisation du mot de passe')
        }
    }

    return (
        <Layout title='Modification du mot de passe - Portfolio CAudrel'>
            <section className='login'>
                <h1>Enregistrer un nouveau mot de passe</h1>
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
                                {'Réinitialiser'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    )
}

export default ResetPassword
