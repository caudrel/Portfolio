import { useState } from 'react'
import { useForgotPasswordMutation } from '@/graphql/generated/schema'
import Layout from '@/components/Layout'
import { toast } from 'react-toastify'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [forgotPassword, { data, loading, error }] =
        useForgotPasswordMutation()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await forgotPassword({ variables: { data: { email } } })
            toast.success('Email envoyé avec succès !')
        } catch (err) {
            setErrorMessage("Erreur lors de l'envoi de l'email")
            toast.error("Erreur lors de l'envoi de l'email")
        }
    }

    return (
        <Layout title='Mot de passe oublié - Portfolio CAudrel'>
            <section className='login'>
                <h1 className=''>Réinitialiser mon mot de passe</h1>
                <div>{errorMessage && <p className=''>{errorMessage}</p>}</div>
                <div className='form-frame'>
                    <form className='form' onSubmit={handleSubmit}>
                        <p className=''>
                            Renseignez votre email et nous vous enverrons un
                            lien pour réinitialiser votre mot de passe
                        </p>

                        <div className='labels'>
                            <div className='label'>
                                <label htmlFor='email'>
                                    <span className=''>Mon email</span>
                                </label>
                                <input
                                    data-testid='forgot-password-email'
                                    id='email'
                                    type='email'
                                    name='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className='form-validation'>
                            <button
                                type='submit'
                                disabled={loading}
                                className='btn-secondary'
                            >
                                {'Envoyer'}
                            </button>
                        </div>
                    </form>
                </div>
                {data && data.forgotPassword && (
                    <>
                        <p className='text-green-700'>
                            Email envoyé avec succès !
                        </p>
                        <p className='text-green-700'>
                            Rendez-vous sur votre messagerie pour ré-initialiser
                            votre mot de passe.
                        </p>
                    </>
                )}
                {error && <p className='text-red-600'>{error.message}</p>}
            </section>
        </Layout>
    )
}

export default ForgotPassword
