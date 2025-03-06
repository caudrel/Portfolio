import Image from 'next/image'
import Layout from '../components/Layout'
import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import Projects from '@/components/Projects'
//import { connectedUserEmail } from '@/middleware'

export default function Home() {
    //const email = connectedUserEmail()
    //console.log('email', email)
    const languages = useMemo(
        () => ['Laravel', 'Symfony', 'Next.js', 'Node.js', 'SQL'],
        []
    )
    const [currentLanguage, setCurrentLanguage] = useState<string>('') // Stocke la langue actuelle
    const [index, setIndex] = useState<number>(0) // Suivi de l'index

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLanguage(languages[index]) // Met à jour la langue actuelle
            setIndex(prevIndex => (prevIndex + 1) % languages.length) // Passe à l'index suivant, revient au début si nécessaire
        }, 2000) // 2000ms = 2 secondes

        return () => clearInterval(interval) // Nettoyage au démontage
    }, [index, languages])

    // console.log('ctx', ctx.user)

    return (
        <>
            <Layout title='Accueil - Portfolio CAudrel'>
                <section className='title'>
                    <Image
                        className='picbb'
                        src='/aurelpetitedetour.png'
                        alt='Photo Aurelie'
                        width={180}
                        height={180}
                        priority
                    />
                    <h1>AURELIE LOZACH</h1>
                    <h2>Full Stack Developpeuse - Chef de projet</h2>

                    <ul>
                        <li className='tech-caroussel' key={currentLanguage}>
                            {currentLanguage}
                        </li>
                    </ul>
                </section>
                <section className='about' id='about'>
                    <p className='text-stroke bg-light'>RECONVERSION</p>

                    <div className='fiche'>
                        <div className='photo'>
                            <Image
                                className='picnow'
                                src='/aurelPont.jpeg'
                                alt='Photo Aurelie'
                                width={180}
                                height={236}
                            />
                        </div>

                        <div className='experience'>
                            <div className='paragraph'>
                                <p>
                                    {
                                        "Après 10 années d'expérience en tant que Chef de Produit dans le textile, mon passage à la French Tech Bordeaux de 2020 à 2023 a éveillé mon envie de me réorienter vers le développement web."
                                    }
                                </p>

                                <p>
                                    {
                                        "Je me suis formée aux technologies PHP et Symfony au cours d'un bootcamp, puis sur TypeScript, React.js, Next.js, Node.js, Laravel, Docker et GraphQL avec Apollo lors d'une alternance en agence."
                                    }
                                </p>

                                <p>
                                    {
                                        'Ma polyvalence, combinant expertise en gestion de projet, compétences techniques et une approche orientée client, me permet d’apporter une vision globale et concrète aux projets web.'
                                    }
                                </p>
                            </div>
                            <div className='list'>
                                <ul className='perso-info'>
                                    <li aria-label='date de naissance'>
                                        <strong>Anniversaire : </strong>
                                        11/11/1977
                                    </li>
                                    <li>
                                        <strong>Adresse : </strong>Bordeaux
                                    </li>
                                    <li>
                                        <strong>Tel : </strong>06 84 65 04 90
                                    </li>
                                </ul>
                                <ul className='degres-info'>
                                    <li>
                                        <strong>Diplômes : </strong>
                                        <ul>
                                            <li>CDA 2024</li>
                                            <li>DWWM 2023</li>
                                            <li>
                                                <Link
                                                    href='https://www.esce.fr/program/programme-grande-ecole-grade-de-master-2/'
                                                    aria-label='lien vers mon école de commerce'
                                                >
                                                    ESCE
                                                </Link>
                                                2000
                                            </li>
                                            <li>Bac S spé math 1996</li>
                                        </ul>
                                    </li>

                                    <li>
                                        <strong>Technos : </strong>
                                        <ul>
                                            <li>PHP (Laravel, Symfony)</li>
                                            <li>JS (React, Next, Node)</li>
                                            <li>
                                                SQL, GraphQL, Apollo, Docker,
                                                CI, CD
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <svg
                    className='waves'
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    viewBox='0 24 150 50'
                    preserveAspectRatio='none'
                    shapeRendering='auto'
                >
                    <defs>
                        <path
                            id='gentle-wave'
                            d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
                        />
                    </defs>
                    <g className='parallax'>
                        <use
                            xlinkHref='#gentle-wave'
                            x='48'
                            y='0'
                            fill='rgba(31, 90, 255,0.4)'
                        />
                        <use
                            xlinkHref='#gentle-wave'
                            x='48'
                            y='2'
                            fill='rgba(31, 90, 255,0.2)'
                        />
                        <use
                            xlinkHref='#gentle-wave'
                            x='48'
                            y='5'
                            fill='rgba(31, 90, 255,0.1)'
                        />
                        <use
                            xlinkHref='#gentle-wave'
                            x='48'
                            y='7'
                            fill='rgba(31, 90, 255,0.6)'
                        />
                        <use
                            xlinkHref='#gentle-wave'
                            x='48'
                            y='9'
                            fill='rgba(31, 90, 255,1)'
                        />
                    </g>
                </svg>

                <Projects />
            </Layout>
        </>
    )
}
