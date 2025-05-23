import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
    useGetUserFromCtxLazyQuery,
    useLogoutMutation,
} from '@/graphql/generated/schema'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [userRole, setUserRole] = useState<string | null>(null)
    const [loadingUser, setLoadingUser] = useState(true)
    const [getUser, { data, loading, error }] = useGetUserFromCtxLazyQuery()
    const router = useRouter()
    const isConnected = false //// Change

    useEffect(() => {
        getUser() // Lance la requête manuellement
    }, [getUser])

    useEffect(() => {
        if (!loading && data) {
            setUserRole(data.getUserFromCtx?.role || null)
            setLoadingUser(false) // Fin du chargement des données utilisateur
        }
    }, [data, loading])

    const [logout] = useLogoutMutation({
        onCompleted: () => {
            toast.success('Déconnexion réussie!')
            router.push('/').then(() => {
                setTimeout(() => window.location.reload(), 3000)
            })
        },
        onError: error => {
            toast.error(`Erreur lors de la déconnexion: ${error.message}`)
        },
        fetchPolicy: 'no-cache',
    })

    const handleLogout = () => {
        setMenuOpen(false)
        logout()
    }

    useEffect(() => {
        if (router.asPath.includes('#')) {
            const sectionId = router.asPath.split('#')[1]
            const section = document.getElementById(sectionId)
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }, [router.asPath])

    useEffect(() => {
        // Détecter si la largeur de l'écran est inférieure ou égale à un seuil (e.g., 768px pour les mobiles)
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 520)
        }

        // Détecter le scroll pour le style de la navbar
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 1)
        }

        // Ajouter les écouteurs pour resize et scroll
        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', handleScroll)

        // Appeler handleResize au montage pour définir initialement isMobile
        handleResize()

        return () => {
            // Nettoyer les écouteurs lors du démontage du composant
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (!loading && !data) {
            // Vérifier si la requête a bien été effectuée avant de rediriger
            if (!error && !loadingUser) {
                const timeout = setTimeout(() => {
                    router.push('/auth/login')
                }, 500)

                return () => clearTimeout(timeout)
            }
        }
    }, [loading, data, router, error, loadingUser])

    //if (loading || loadingUser) return <p>Attente du rôle utilisateur...</p>

    // if (error) return <p>Error...</p>

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            {!isMobile ? (
                <nav className='navbar'>
                    <Link className='btn-primary' href='/contact'>
                        Contact
                    </Link>

                    <div className='nav-links'>
                        <div>
                            <Link
                                className={`menu-link ${isScrolled ? 'scrolled' : ''}`}
                                href='/'
                            >
                                Home
                            </Link>

                            <Link
                                className={`menu-link ${isScrolled ? 'scrolled' : ''}`}
                                href='/#about'
                            >
                                A propos
                            </Link>

                            <Link
                                className={`menu-link ${isScrolled ? 'scrolled' : ''}`}
                                href='/projets'
                            >
                                Projets
                            </Link>

                            {isConnected && (
                                <Link
                                    className={`menu-link ${isScrolled ? 'scrolled' : ''}`}
                                    href='/mon-compte'
                                >
                                    Mon compte
                                </Link>
                            )}

                            {isConnected &&
                                userRole &&
                                userRole === 'admin' && (
                                    <>
                                        <div
                                            className='admin-dropdown'
                                            onMouseEnter={() =>
                                                setDropdownOpen(true)
                                            } // Affiche le menu au survol (laptop)
                                            onMouseLeave={() =>
                                                setDropdownOpen(false)
                                            } // Cache le menu lorsqu'on sort (laptop)
                                        >
                                            <button
                                                className={`dropdown-button ${isScrolled ? 'scrolled' : ''}`}
                                                onClick={() =>
                                                    setDropdownOpen(
                                                        !dropdownOpen
                                                    )
                                                }
                                            >
                                                Admin
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='13'
                                                    height='13'
                                                    fill='currentColor'
                                                    className='bi bi-caret-down-fill'
                                                    viewBox='0 0 16 16'
                                                >
                                                    <path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' />
                                                </svg>
                                            </button>

                                            <div
                                                className={`dropdown-menu ${dropdownOpen ? 'visible' : ''} ${isScrolled ? 'scrolled' : ''}`}
                                            >
                                                <Link href='/admin/technologies'>
                                                    Technologies
                                                </Link>
                                                <Link href='/admin/members'>
                                                    {"Membres d'équipe"}
                                                </Link>
                                                <Link href='/admin/projects'>
                                                    Projets
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                )}
                        </div>
                    </div>
                    <div className='login-placeholder'></div>

                    {/* {!isConnected && (
                        <Link href='/auth/login' className='btn-primary'>
                            Login
                        </Link>
                    )}

                    {isConnected && (
                        <button
                            className='btn-secondary'
                            onClick={() => handleLogout()}
                        >
                            Logout
                        </button>
                    )} */}
                </nav>
            ) : (
                // Burger menu for mobile view
                <nav className='burger-menu mobile'>
                    <Link className='btn-primary' href='/contact'>
                        Contact
                    </Link>
                    <div className='socialIcons-burger'>
                        <button
                            className={`burger-button ${isScrolled ? 'scrolled' : ''}`}
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                fill='currentColor'
                                className='bi bi-list'
                                viewBox='0 0 16 16'
                            >
                                <path
                                    fill-rule='evenodd'
                                    d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5'
                                />
                            </svg>
                        </button>
                        {menuOpen && (
                            //burger menu open
                            <div className='burger-dropdown'>
                                <div className='close-btn-container'>
                                    <button
                                        className='burger-close'
                                        onClick={() => setMenuOpen(!menuOpen)}
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='26'
                                            height='26'
                                            fill='currentColor'
                                            className='bi bi-x-lg'
                                            viewBox='0 0 16 16'
                                        >
                                            <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
                                        </svg>
                                    </button>
                                </div>

                                <div className='burger-link-container'>
                                    <div className='dropdown'>
                                        <Link
                                            href='/contact'
                                            className='dropdown-link'
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Contact
                                        </Link>
                                        <Link
                                            href='/'
                                            className='dropdown-link'
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Home
                                        </Link>
                                        <Link
                                            className='dropdown-link'
                                            href='/#about'
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            A propos
                                        </Link>
                                        <Link
                                            className='dropdown-link'
                                            href='/projets'
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Projets
                                        </Link>
                                        {isConnected && (
                                            <Link
                                                className='dropdown-link'
                                                href='/mon-compte'
                                            >
                                                Mon compte
                                            </Link>
                                        )}
                                        {isConnected &&
                                            userRole &&
                                            userRole === 'admin' && (
                                                <>
                                                    <div
                                                        className='admin-dropdown menu-link mobile'
                                                        onClick={() =>
                                                            setDropdownOpen(
                                                                !dropdownOpen
                                                            )
                                                        }
                                                    >
                                                        <button
                                                            className={`dropdown-button ${isMobile ? 'mobile' : ''}`}
                                                        >
                                                            Admin
                                                            <svg
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                width='13'
                                                                height='13'
                                                                fill='currentColor'
                                                                className='bi bi-caret-down-fill'
                                                                viewBox='0 0 16 16'
                                                            >
                                                                <path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' />
                                                            </svg>
                                                        </button>
                                                        <div
                                                            className={`dropdown-section mobile ${dropdownOpen ? 'visible' : ''}`}
                                                        >
                                                            <Link
                                                                href='/admin/technologies'
                                                                className='dropdown-link admin'
                                                                onClick={() =>
                                                                    setMenuOpen(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                Technologies
                                                            </Link>
                                                            <Link
                                                                href='/admin/members'
                                                                className='dropdown-link admin'
                                                                onClick={() =>
                                                                    setMenuOpen(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    "Membres d'équipe"
                                                                }
                                                            </Link>
                                                            <Link
                                                                href='/admin/projects'
                                                                className='dropdown-link admin'
                                                                onClick={() =>
                                                                    setMenuOpen(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                Projets
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                    </div>

                                    {/* <div>
                                        {' '}
                                        {!isConnected && (
                                            <Link
                                                className='dropdown-link'
                                                href='/auth/login'
                                                onClick={() =>
                                                    setMenuOpen(false)
                                                }
                                            >
                                                Login
                                            </Link>
                                        )}
                                        {isConnected && (
                                            <Link
                                                className='dropdown-link'
                                                href='/'
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </Link>
                                        )}
                                    </div> */}
                                </div>
                                <div className='socialIcons-burger-container'>
                                    <Link
                                        href='mailto:lozachaurelie@gmail.com'
                                        className='nav-icon'
                                        aria-label='Envoyer un email'
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='20'
                                            height='20'
                                            fill='currentColor'
                                            className='bi bi-envelope-at-fill'
                                            viewBox='0 0 16 16'
                                        >
                                            <path d='M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671' />
                                            <path d='M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791' />
                                        </svg>
                                    </Link>
                                    <Link
                                        href='https://www.linkedin.com/in/aurelielozach/'
                                        target='_blank'
                                        className='nav-icon'
                                        aria-label='LinkedIn'
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='20'
                                            height='20'
                                            fill='currentColor'
                                            className='bi bi-linkedin'
                                            viewBox='0 0 16 16'
                                        >
                                            <path d='M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z' />
                                        </svg>
                                    </Link>
                                    <Link
                                        href='https://github.com/caudrel'
                                        target='_blank'
                                        className='nav-icon'
                                        aria-label='GitHub'
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='20'
                                            height='20'
                                            fill='currentColor'
                                            className='bi bi-github'
                                            viewBox='0 0 16 16'
                                        >
                                            <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8' />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            )}
        </header>
    )
}
