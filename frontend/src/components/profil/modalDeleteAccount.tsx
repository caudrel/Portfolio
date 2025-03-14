import { useDeleteUserMutation } from '@/graphql/generated/schema'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Layout from '../Layout'

interface ModalDeleteAccountProps {
    isOpen: boolean
    handleClose: () => void
}

export default function ModalDeleteAccount({
    isOpen,
    handleClose,
}: ModalDeleteAccountProps) {
    const [modalScroll, setModalScroll] = useState(false)
    const [deleteUser, { loading: deleting }] = useDeleteUserMutation()
    const router = useRouter()

    const onConfirm = async () => {
        try {
            await deleteUser()
            toast.success('Votre compte a été supprimé avec succès!')
            router.push('/') // Redirection vers la page d'accueil
        } catch (error) {
            console.error(error)
            toast.error('Erreur lors de la suppression du compte.')
        }
    }

    return (
        <Layout title='Supprimer mon compte - Portfolio CAudrel'>
            <section className='modal-page'>
                <div
                    className={`modal-container ${modalScroll ? 'scroll' : ''}`}
                >
                    <div className='modal-header'>
                        <button
                            className='close-modal'
                            onClick={handleClose}
                            aria-label='Fermer la fenêtre de suppression du compte'
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

                        <h2>Confirmer la suppression du compte</h2>
                    </div>
                    <div className='form-frame'>
                        <div className='delete-section'>
                            <p>
                                Êtes-vous sûr de vouloir supprimer
                                définitivement votre compte ?
                            </p>
                            <p>
                                <b>Cette action est irréversible.</b>
                            </p>
                            <div className='validation-btns'>
                                <button
                                    type='button'
                                    className='btn-danger'
                                    onClick={onConfirm}
                                    disabled={deleting}
                                >
                                    {deleting
                                        ? 'Suppression en cours...'
                                        : 'Supprimer mon compte'}
                                </button>
                                <button
                                    type='button'
                                    className='btn-secondary'
                                    onClick={handleClose}
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
