import React, { createContext, useContext } from 'react'
import { ApolloError } from '@apollo/client'
import {
    useGetUserFromCtxQuery,
    UserWoPassword,
} from '@/graphql/generated/schema'

type UserContextType = {
    user: UserWoPassword | null
    loading: boolean
    error: ApolloError | string | null // Possible string or ApolloError
}

// Création du contexte utilisateur
const userContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { data, loading, error } = useGetUserFromCtxQuery()

    let errorMessage = null
    if (error) {
        // Logique de gestion de l'erreur
        errorMessage = error.message // Ici, tu peux récupérer le message d'erreur ou d'autres infos
        console.error('Apollo Error:', errorMessage)
    }

    const user = data?.getUserFromCtx ?? null

    return (
        <userContext.Provider value={{ user, loading, error: errorMessage }}>
            {loading ? (
                <p>Chargement...</p>
            ) : user ? (
                children
            ) : (
                <p>Aucun utilisateur trouvé</p>
            )}
        </userContext.Provider>
    )
}

// Hook pour accéder au contexte utilisateur
export const useUser = (): UserContextType => {
    const context = useContext(userContext)
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}
