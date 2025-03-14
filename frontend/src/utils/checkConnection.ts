import {
    useGetUserFromCtxQuery,
    UserWoPassword,
} from '@/graphql/generated/schema'
import Cookies from 'js-cookie'

export const checkUserConnected = () => {
    const cookies = Cookies
    const idCookie = cookies.get('id')
    if (idCookie) {
        return true
    }
    return false
}
