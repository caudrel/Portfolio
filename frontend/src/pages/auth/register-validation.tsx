import { useState, useEffect } from 'react'
import {
    useConfirmRegisterMutation,
    InputRegisterValidation,
} from '@/graphql/generated/schema'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { toast } from 'react-toastify'
import { getConstraints } from '@/lib/utils'
import Link from 'next/link'

export default function RegisterValidation() {
    const router = useRouter()
    const token = router.query.token as string
    const email = router.query.email as string
    const [cguAccepted, setCguAccepted] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isCguChecked, setIsCguChecked] = useState(true) // ✅ Gérer l'état de la case à cocher

    const [confirmRegister, { error, loading }] = useConfirmRegisterMutation({
        onCompleted: data => {
            if (data?.confirmRegister?.success === true) {
                toast.success(
                    'Inscription réussie! Vous pouvez maintenant vous connecter.'
                )
                router.push('/auth/login')
            } else {
                toast.error(
                    "Erreur lors de l'inscription: Vérifiez vos informations."
                )
            }
        },
        onError: error => {
            console.error('GraphQL Error:', error)
            const serverMessage = error.message || "Une erreur s'est produite."
            toast.error(`Erreur: ${serverMessage}`)
        },
    })

    const validationErrors =
        error?.graphQLErrors[0]?.extensions?.validationErrors
    const errorMessages = validationErrors
        ? getConstraints(validationErrors)
        : []

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const data: InputRegisterValidation = {
            first_name: (formData.get('first_name') as string).trim(),
            last_name: (formData.get('last_name') as string).trim(),
            password: (formData.get('password') as string).trim(),
            token: token,
            validated_consent_cgu: new Date().toISOString(), // ✅ Ajouter la date actuelle
        }

        if (
            !data.first_name ||
            !data.last_name ||
            !data.token ||
            !data.password
        ) {
            toast.error('Tous les champs doivent être remplis.')
            return
        }

        if (data.password.length < 8) {
            setErrorMessage(
                'Le mot de passe doit contenir au moins 8 caractères'
            )
            toast.error('Le mot de passe doit contenir au moins 8 caractères')
            return
        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/
        if (!passwordRegex.test(data.password)) {
            setErrorMessage(
                'Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial'
            )
            toast.error(
                'Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial'
            )
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email || !emailRegex.test(email)) {
            toast.error("L'email est invalide.")
            return
        }

        try {
            await confirmRegister({ variables: { data } })
        } catch (err) {
            console.error("Erreur lors de l'envoi des informations", err)
        }
    }

    // Utiliser useEffect pour écouter l'état de la case CGU
    useEffect(() => {
        if (!cguAccepted) {
            toast.error('Veuillez accepter les CGU avant de continuer.')
        }
    }, [cguAccepted])

    return (
        <Layout title='Finalisation de création de compte - Portfolio CAudrel'>
            <section className='login'>
                <h1>Finalisez votre création de compte</h1>

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
                                    type='text'
                                    name='email'
                                    value={email}
                                    readOnly
                                />
                            </div>
                            <div className='label'>
                                <label htmlFor='first_name'>Prénom</label>
                                <input
                                    id='first_name'
                                    type='text'
                                    name='first_name'
                                    required
                                />
                            </div>
                            <div className='label'>
                                <label htmlFor='last_name'>Nom</label>
                                <input
                                    id='last_name'
                                    type='text'
                                    name='last_name'
                                    required
                                />
                            </div>

                            <div className='label'>
                                <label htmlFor='password'>Mot de passe</label>
                                <input
                                    id='password'
                                    type='password'
                                    name='password'
                                    required
                                />
                            </div>

                            <div className='checkbox'>
                                <label htmlFor='cgu'>
                                    <input
                                        type='checkbox'
                                        id='cgu'
                                        name='cgu'
                                        checked={isCguChecked} // ✅ Bindé à isCguChecked
                                        onChange={e =>
                                            setIsCguChecked(e.target.checked)
                                        } // ✅ Mettre à jour l'état
                                    />
                                    <span className='custom-checkbox'></span>
                                    J&apos;accepte les CGU
                                    <Link href={'/cgu'}>(disponibles ici)</Link>
                                </label>
                            </div>
                        </div>
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
