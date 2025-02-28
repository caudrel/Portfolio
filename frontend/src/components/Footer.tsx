import Link from 'next/link'

export default function Footer() {
    return (
        <footer className='footer'>
            <div className='links'>
                <Link
                    href='/privacy-policy'
                    className='button logo link-button'
                >
                    <span className='mobile-short-label'>CGU</span>
                    <span className='desktop-long-label text-xl'>
                        Politique de confidentialité
                    </span>
                </Link>
                <Link href='/' className='otherlink'>
                    <span className=''>Other Link</span>
                </Link>
            </div>
        </footer>
    )
}
