import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { useGetUserFromCtxLazyQuery } from '@/graphql/generated/schema'
import ModalModifyDetails from '@/components/profil/modalModifyDetails'

export default function Profile() {
    const [isModalOpen, setIsModalOpen] = useState(false) // 🔥 Gestion de la modale
    const [getUser, { data, loading, error }] = useGetUserFromCtxLazyQuery()

    useEffect(() => {
        if (isModalOpen) {
            setTimeout(() => document.body.classList.add('modal-open'), 0)
        } else {
            setTimeout(() => document.body.classList.remove('modal-open'), 0)
        }
    }, [isModalOpen])

    // Lance la requête manuellement lors du montage du composant
    useEffect(() => {
        getUser()
    }, [getUser])

    // Gestion de l'affichage pendant le chargement ou en cas d'erreur
    if (loading) return <p>Chargement en cours...</p>
    if (error)
        return (
            <p>Erreur lors du chargement des informations : {error.message}</p>
        )

    const user = data?.getUserFromCtx
    if (!user) {
        return <p>Aucun utilisateur connecté</p>
    }

    const { first_name, last_name, email } = user

    return (
        <Layout title='Mon compte - Portfolio CAudrel'>
            <section className={`profil ${isModalOpen ? 'modal-open' : ''}`}>
                <h1>Mon compte</h1>

                <div className='profil-frame'>
                    <div className='container-frame'>
                        <div className='frame'>
                            <div className='profil-section'>
                                <h2>Mes informations</h2>
                                <p>Retrouvez ici vos informations</p>
                            </div>
                            <div className='profil-section'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Nom :</th>
                                            <td>{last_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Prénom :</th>
                                            <td>{first_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Email :</th>
                                            <td>{email}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* ✅ Bouton qui ouvre la modale */}
                        <button
                            className='btn-primary modify-profil-btn'
                            onClick={() => setIsModalOpen(true)}
                        >
                            Modifier mes informations
                        </button>
                    </div>
                </div>

                <div className='profil-frame'>
                    <div className='frame'>
                        <div className='profil-section'>
                            <h2>Mon mot de passe</h2>
                            <p>Modifier mon mot de passe</p>
                        </div>
                        <button className='btn-primary modify-password'>
                            Modifier mon mot de passe
                        </button>
                    </div>
                </div>

                <div>
                    <button className='btn-primary'>
                        Supprimer mon compte
                    </button>
                </div>
            </section>
            {/* Modale affichée uniquement si `isModalOpen` est `true` */}
            {isModalOpen && (
                <ModalModifyDetails
                    isOpen={isModalOpen}
                    handleClose={() => setIsModalOpen(false)}
                />
            )}
        </Layout>
    )
}
