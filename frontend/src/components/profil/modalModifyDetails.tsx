import { useUpdateUserMutation } from '@/graphql/generated/schema'
import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { useUser } from '@/context/UserContext'
import Layout from '../Layout'

interface ModalModifyDetailsProps {
    isOpen: boolean
    handleClose: () => void
}

export default function ModalModifyDetails({
    isOpen,
    handleClose,
}: ModalModifyDetailsProps) {
    const modalContentRef = useRef<HTMLDivElement>(null)
    const { user, loading } = useUser()
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [modalScroll, setModalScroll] = useState(false)

    useEffect(() => {
        if (user) {
            setFirstName(user.first_name || '')
            setLastName(user.last_name || '')
            setEmail(user.email || '')
        }
    }, [user])

    useEffect(() => {
        const handleResize = () => {
            const modalElement = modalContentRef.current
            if (modalElement) {
                setModalScroll(modalElement.offsetHeight > window.innerHeight)
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [isOpen])

    const [updateUser, { loading: updating }] = useUpdateUserMutation()

    const onConfirm = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await updateUser({
                variables: { data: { first_name, last_name, email } },
            })
            toast.success('Les informations ont été modifiées avec succès!')
            handleClose()
            window.location.reload()
        } catch (error) {
            console.error(error)
            toast.error('Erreur lors de la modification des informations.')
        }
    }

    if (loading) return <div>Chargement...</div>

    return (
        <Layout title='Modifier mes informations - Portfolio CAudrel'>
            <section
                className={`modal-container ${modalScroll ? 'scroll' : ''}`}
                ref={modalContentRef}
            >
                <div className='modal-header'>
                    <button className='close-modal' onClick={handleClose}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            fill='currentColor'
                            className='bi bi-x-lg hover:cursor-pointer'
                            viewBox='0 0 16 16'
                            aria-label='Fermer la fenêtre de modification'
                        >
                            <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
                        </svg>
                    </button>

                    <h2>Modifier mes informations</h2>
                </div>

                <div className='form-frame'>
                    <form className='form' onSubmit={onConfirm}>
                        <div className='labels'>
                            <div className='label'>
                                <label htmlFor='last_name'>Nom</label>
                                <input
                                    id='last_name'
                                    type='text'
                                    value={last_name}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>

                            <div className='label'>
                                <label htmlFor='first_name'>Prénom</label>
                                <input
                                    id='first_name'
                                    type='text'
                                    value={first_name}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className='label'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    id='email'
                                    type='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
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
                    </form>
                </div>
            </section>
        </Layout>
    )
}
