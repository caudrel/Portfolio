import React, { createContext, useContext, useEffect, useState } from 'react'
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

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { data, loading, error } = useGetUserFromCtxQuery()
    const [user, setUser] = useState<UserWoPassword | null>(null)

    useEffect(() => {
        //console.log('useEffect triggered: data', data) // Ajout pour debug
        if (!loading && data?.getUserFromCtx) {
            setUser(data.getUserFromCtx)
        }
    }, [data, loading])

    return (
        <userContext.Provider value={{ user, loading, error: error ?? null }}>
            {children}
        </userContext.Provider>
    )
}

//Hook pour accéder au contexte utilisateur
export const useUser = (): UserContextType => {
    const context = useContext(userContext)
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}
