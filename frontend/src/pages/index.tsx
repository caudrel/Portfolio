import Image from 'next/image'
import Layout from '../components/Layout'
import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
//import { connectedUserEmail } from '@/middleware'

export default function Home() {
    //const email = connectedUserEmail()
    //console.log('email', email)
    const languages = useMemo(
        () => [
            'React.js',
            'Next.js',
            'Node.js',
            'Docker',
            'Laravel',
            'Symfony',
            'PHP',
            'SQL',
            'GraphQl',
            'SASS',
            'TypeScript',
            'CI CD',
        ],
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
                    <h2>Product Owner</h2>

                    <ul>
                        <li className='tech-caroussel' key={currentLanguage}>
                            {currentLanguage}
                        </li>
                    </ul>
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
                    <g
                        className='parallax'
                        transform='scale(1, -1) translate(0, -100)'
                    >
                        <use
                            xlinkHref='#gentle-wave'
                            x='48'
                            y='0'
                            fill='rgba(127, 239, 254,0.4)'
                        />
                        <use
                            xlinkHref='#gentle-wave'
                            x='48'
                            y='2'
                            fill='rgba(127, 239, 254,0.5)'
                        />
                        <use
                            xlinkHref='#gentle-wave'
                            x='48'
                            y='5'
                            fill='rgba(127, 239, 254,0.3)'
                        />
                        <use
                            xlinkHref='#gentle-wave'
                            x='48'
                            y='7'
                            fill='rgba(127, 239, 254,0.8)'
                        />
                        <use
                            xlinkHref='#gentle-wave'
                            x='48'
                            y='9'
                            fill='rgba(127, 239, 254,1)'
                        />
                    </g>
                </svg>

                <section className='about' id='about'>
                    <p className='text-stroke bg-light'>A PROPOS</p>

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
                                <p className='jobtitle'>
                                    Aurélie : BUSINESS ANALYST - MOA
                                </p>
                                <p>
                                    {
                                        'Avec plus de 10 ans d’expérience en gestion de produits, j’adopte une approche centrée utilisateur, axée sur la création de valeur.'
                                    }
                                </p>

                                <p>
                                    {
                                        "Mon passage à La French Tech Bordeaux a consolidé ma gestion des plannings complexes, conciliant ressources, délais et priorités, tout en renforçant mon intérêt pour l'innovation et les projets digitaux."
                                    }
                                </p>

                                <p>
                                    {
                                        "Cette expérience m'a poussée à me former aux technologies PHP et Symfony lors d’un bootcamp, puis à approfondir mes compétences sur TypeScript, React.js, Next.js, Node.js, Laravel, Docker et GraphQL avec Apollo lors d’une alternance en agence."
                                    }
                                </p>

                                <p>
                                    {
                                        'Sensible à la satisfaction client et à l’écoute des utilisateurs, je collabore avec les équipes métier et techniques pour analyser les besoins, rédiger les spécifications, prioriser les fonctionnalités et garantir la cohérence fonctionnelle des solutions digitales.'
                                    }
                                </p>

                                <p>
                                    {
                                        'Forte d’une double compétence technique et fonctionnelle, consolidée par mon expérience en gestion de projet chez Levi’s, Chantelle et Renault, j’accompagne aujourd’hui vos projets en assurant une collaboration fluide entre les équipes.'
                                    }
                                </p>
                            </div>
                            <div className='list'>
                                <ul className='degres-info'>
                                    <li>
                                        <h3>A propos : </h3>

                                        <ul>
                                            <li aria-label='date de naissance'>
                                                <strong>Anniversaire : </strong>
                                                11/11/1977
                                            </li>
                                            <li>
                                                <strong>Adresse : </strong>
                                                Bordeaux
                                            </li>
                                            <li>
                                                <strong>Tel : </strong>06 84 65
                                                04 90
                                            </li>
                                            <li>
                                                <strong>Langues : </strong>
                                                Bilingue anglais
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul className='degres-info'>
                                    <li>
                                        <h3>Diplômes : </h3>
                                        <ul>
                                            <li>
                                                2025 - Certification Agile PSPO
                                                1 - scrum.org - en cours
                                            </li>
                                            <li>
                                                2024 - Certification CDA - Wild
                                                Code School - 1 an
                                            </li>
                                            <li>
                                                2023 - Certification DWWM - Wild
                                                Code School - 5 mois
                                            </li>
                                            <li>
                                                <Link
                                                    href='https://www.esce.fr/program/programme-grande-ecole-grade-de-master-2/'
                                                    aria-label='lien vers mon école de commerce'
                                                    target='_blank'
                                                >
                                                    2000 - Ecole de Commerce -
                                                    ESCE - Paris la Défense
                                                </Link>
                                            </li>
                                            <li>
                                                1996 - Bac Scientifique -
                                                spécialité mathématiques
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul className='degres-info'>
                                    <li>
                                        <h3>Technos : </h3>
                                        <ul>
                                            <li>PHP (Laravel, Symfony)</li>
                                            <li>
                                                JS (React, Next, Node,
                                                TypeScript)
                                            </li>
                                            <li>
                                                SQL, GraphQL, Apollo, Docker,
                                                CI-CD, Github Actions
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul className='degres-info'>
                                    <li>
                                        <h3>Savoir-Être</h3>
                                        <ul>
                                            <li>Bonne humeur</li>
                                            <li>Communication</li>
                                            <li>Organisation</li>
                                            <li>Rigueur</li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul className='degres-info'>
                                    <li>
                                        <h3>Savoir-Faire</h3>
                                        <ul>
                                            <li>
                                                Identification des besoins user
                                            </li>
                                            <li>Priorisation par la valeur</li>
                                            <li>Rédaction de User Stories</li>
                                            <li>Suivi des KPI, reporting</li>
                                            <li>
                                                Validation qualité (tests
                                                fonctionnels)
                                            </li>
                                            <li>
                                                Animation d’équipes
                                                pluridisciplinaires
                                            </li>
                                            <li>
                                                Vision produit et parcours
                                                utilisateur
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}
