import { useUpdatePasswordMutation } from '@/graphql/generated/schema'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Layout from '../Layout'
import Link from 'next/link'

interface ModalModifyPasswordProps {
    isOpen: boolean
    handleClose: () => void
}

export default function ModalModifyPassword({
    isOpen,
    handleClose,
}: ModalModifyPasswordProps) {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [modalScroll, setModalScroll] = useState(false)

    const [updatePassword, { loading: updating }] = useUpdatePasswordMutation()

    const onConfirm = async (e: React.FormEvent) => {
        e.preventDefault()

        if (newPassword !== confirmNewPassword) {
            toast.error('Les nouveaux mots de passe ne correspondent pas.')
            return
        }

        try {
            await updatePassword({
                variables: {
                    data: { oldPassword, newPassword, confirmNewPassword },
                },
            })
            toast.success('Votre mot de passe a été mis à jour avec succès!')
            handleClose()
        } catch (error) {
            console.error(error)
            toast.error('Erreur lors de la mise à jour du mot de passe.')
        }
    }

    return (
        <Layout title='Modifier mon mot de passe - Portfolio CAudrel'>
            <section className='modal-page'>
                <div
                    className={`modal-container ${modalScroll ? 'scroll' : ''}`}
                >
                    <div className='modal-header'>
                        <button
                            className='close-modal'
                            onClick={handleClose}
                            aria-label='Fermer la fenêtre de modification du mot de passe'
                        >
                            <span className='visually-hidden'>
                                Fermer la fenêtre contextuelle
                            </span>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='25'
                                height='25'
                                fill='currentColor'
                                className='bi bi-x-lg hover:cursor-pointer'
                                viewBox='0 0 16 16'
                            >
                                <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
                            </svg>
                        </button>

                        <h2>Modifier mon mot de passe</h2>
                    </div>
                    <div className='form-frame'>
                        <form className='form' onSubmit={onConfirm}>
                            <div className='labels'>
                                <div className='label'>
                                    <label htmlFor='oldPassword'>
                                        Ancien mot de passe
                                    </label>
                                    <input
                                        id='oldPassword'
                                        type='password'
                                        value={oldPassword}
                                        onChange={e =>
                                            setOldPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <div className='label'>
                                    <label htmlFor='newPassword'>
                                        Nouveau mot de passe
                                    </label>
                                    <input
                                        id='newPassword'
                                        type='password'
                                        value={newPassword}
                                        onChange={e =>
                                            setNewPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <div className='label'>
                                    <label htmlFor='confirmNewPassword'>
                                        Confirmer le nouveau mot de passe
                                    </label>
                                    <input
                                        id='confirmNewPassword'
                                        type='password'
                                        value={confirmNewPassword}
                                        onChange={e =>
                                            setConfirmNewPassword(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className='form-validation'>
                                <button
                                    type='submit'
                                    className='btn-secondary'
                                    disabled={updating}
                                >
                                    {updating ? 'Mise à jour...' : 'Modifier'}
                                </button>
                            </div>
                            <Link href='/auth/reset-password'>
                                Je ne me souviens plus de mon mot de passe 🤭.
                                Réinitialiser
                            </Link>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
