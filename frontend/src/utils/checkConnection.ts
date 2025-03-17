import { useEffect, useState } from 'react'
import {
    useGetUserFromCtxQuery,
    UserWoPassword,
} from '@/graphql/generated/schema'

export function checkUserConnected() {
    const [user, setUser] = useState<UserWoPassword | null>(null)
    const { data, loading, error } = useGetUserFromCtxQuery()

    useEffect(() => {
        if (data?.getUserFromCtx) {
            setUser(data.getUserFromCtx)
        }
    }, [data])

    return { user, loading, error }
}
