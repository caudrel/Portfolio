import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { useGetUserFromCtxLazyQuery } from '@/graphql/generated/schema'
import ModalModifyDetails from '@/components/profil/modalModifyDetails'
import ModalModifyPassword from '@/components/profil/modalModifyPassword'
import ModalDeleteAccount from '@/components/profil/modalDeleteAccount'

export default function Profile() {
    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false)
    const [isModalModifyPasswordOpen, setIsModalModifyPasswordOpen] =
        useState(false) // 🔥 Gestion de la modale
    const [isModalDeleteAccountOpen, setIsModalDeleteAccountOpen] =
        useState(false) // 🔥 Gestion de la modale

    const [getUser, { data, loading, error }] = useGetUserFromCtxLazyQuery()

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
            <section className='profil'>
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
                            onClick={() => setIsModalDetailsOpen(true)}
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
                        <button
                            className='btn-primary modify-profil-btn'
                            onClick={() => setIsModalModifyPasswordOpen(true)}
                        >
                            Modifier mon mot de passe
                        </button>
                    </div>
                </div>

                <div>
                    <button
                        className='btn-primary modify-profil-btn'
                        onClick={() => setIsModalDeleteAccountOpen(true)}
                    >
                        Supprimer mon compte
                    </button>
                </div>
            </section>
            {/* Modale affichée uniquement si `isModalDetailsOpen` est `true` */}
            {isModalDetailsOpen && (
                <ModalModifyDetails
                    isOpen={isModalDetailsOpen}
                    handleClose={() => setIsModalDetailsOpen(false)}
                />
            )}
            {isModalModifyPasswordOpen && (
                <ModalModifyPassword
                    isOpen={isModalModifyPasswordOpen}
                    handleClose={() => setIsModalModifyPasswordOpen(false)}
                />
            )}
            {isModalDeleteAccountOpen && (
                <ModalDeleteAccount
                    isOpen={isModalDeleteAccountOpen}
                    handleClose={() => setIsModalDeleteAccountOpen(false)}
                />
            )}
        </Layout>
    )
}
