import { useState } from 'react'
import { useRouter } from 'next/router'
import { useResetPasswordMutation } from '@/graphql/generated/schema'
import { toast } from 'react-toastify'
import Head from 'next/head'

function ResetPassword() {
    const router = useRouter()
    const { token } = router.query
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [resetPassword, { data, error }] = useResetPasswordMutation()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Les mots de passe ne correspondent pas')
            return
        }
        try {
            const result = await resetPassword({
                variables: { token: token as string, newPassword: password },
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
        <>
            <Head>
                <title>Modification du mot de passe - Easy Gift</title>
            </Head>
            <section className='login'>
                <h1>Enregistrer un nouveau mot de passe</h1>
                <form className='' onSubmit={handleSubmit}>
                    <div className=''>
                        <label className='' htmlFor='password'>
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

                    <div className=''>
                        <label className='' htmlFor='confirmPassword'>
                            Confirmez le mot de passe
                        </label>
                        <input
                            type='password'
                            id='confirmPassword'
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type='submit' className='btn-secondary'>
                        {'Réinitialiser'}
                    </button>
                </form>
            </section>
        </>
    )
}

export default ResetPassword
