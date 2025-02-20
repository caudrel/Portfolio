import Head from 'next/head'
import { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
    title?: string | null
}

export default function Layout({ children, title }: LayoutProps) {
    return (
        <>
            <Head>
                <title>{title || 'Portfolio Aurélie'}</title>
                <meta name='description' content='Portfolio CAudrel' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />

                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className=''>{children}</main>
        </>
    )
}
