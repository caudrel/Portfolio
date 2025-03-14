import Head from 'next/head'
import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
    children: ReactNode
    title?: string | null
}

export default function Layout({ children, title }: LayoutProps) {
    return (
        <>
            <Head>
                <title>{title || 'Portfolio Aurélie'}</title>
                <meta
                    name='description'
                    content='Le site CAudrel vise à présenter Aurélie et présenter ses compétences'
                />
            </Head>

            <main>{children}</main>
        </>
    )
}
