import '@/styles/index.scss'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { ApolloProvider } from '@apollo/client'
import client from '@/graphql/client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { toast, ToastContainer, Bounce } from 'react-toastify'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { UserProvider } from '@/context/UserContext'

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''

export default function App({ Component, pageProps }: AppProps) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return null

    return (
        <ApolloProvider client={client}>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <UserProvider>
                    <Header />
                    <Layout>
                        <Component {...pageProps} />
                        <ToastContainer
                            position='top-right'
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick={false}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme='light'
                            transition={Bounce}
                        />
                    </Layout>
                    <Footer />
                </UserProvider>
            </GoogleOAuthProvider>
        </ApolloProvider>
    )
}
