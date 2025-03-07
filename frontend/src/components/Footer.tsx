import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Footer() {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500)
        }

        // Définir la valeur initiale
        handleResize()

        // Ajouter l'écouteur d'événements
        window.addEventListener('resize', handleResize)

        // Nettoyer l'écouteur lorsqu'on démonte le composant
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return (
        <footer className='footer'>
            <div className='links'>
                <Link className='footer-link' href='/mentions-legales'>
                    {isMobile ? (
                        <span>Confidentialité</span>
                    ) : (
                        <span>Politique de confidentialité</span>
                    )}
                </Link>
                <Link className='footer-link' href='/cgu'>
                    {isMobile ? (
                        <span>CGU</span>
                    ) : (
                        <span>Conditions générales d&apos;utilisation</span>
                    )}
                </Link>
            </div>
        </footer>
    )
}
