import { useEffect, useRef } from 'react'
import Layout from '../Layout'

interface ModalViewVideoProps {
    isOpen: boolean
    handleClose: () => void
    src_video?: string | null
}

export default function ModalViewVideo({
    src_video,
    isOpen,
    handleClose,
}: ModalViewVideoProps) {
    const playerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!isOpen || !src_video) return

        // Extraire l'ID de la vidéo depuis l'URL YouTube
        const videoIdMatch = src_video.match(
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
        )
        const videoId = videoIdMatch ? videoIdMatch[1] : null

        if (!videoId) return

        // Charger l'API YouTube si ce n'est pas déjà fait
        if (!window.YT) {
            const tag = document.createElement('script')
            tag.src = 'https://www.youtube.com/iframe_api'
            const firstScriptTag = document.getElementsByTagName('script')[0]
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
        }

        // Fonction de callback appelée une fois l'API chargée
        window.onYouTubeIframeAPIReady = () => {
            new window.YT.Player(playerRef.current, {
                videoId,
                playerVars: {
                    autoplay: 1, // Démarrer automatiquement
                    controls: 1, // Afficher les contrôles
                    modestbranding: 1, // Masquer le branding YouTube
                    rel: 0, // Ne pas afficher de vidéos suggérées
                    showinfo: 0, // Masquer les infos
                },
            })
        }
    }, [isOpen, src_video])

    if (!isOpen) return null

    return (
        <Layout title='Visionner une démo - Portfolio CAudrel'>
            <section className='modal-page-video'>
                <div className='modal-container-video'>
                    <div className='modal-header-video'>
                        <button
                            className='close-modal'
                            onClick={handleClose}
                            aria-label='Fermer la fenêtre de visualisation vidéo'
                        >
                            <span className='visually-hidden'>Fermer</span>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='25'
                                height='25'
                                fill='currentColor'
                                className='bi bi-x-lg hover:cursor-pointer'
                                viewBox='0 0 16 16'
                            >
                                <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
                            </svg>
                        </button>
                    </div>
                    <div className='form-frame-video'>
                        {src_video ? (
                            <iframe
                                // width='900'
                                // height='500'
                                src={src_video}
                                title='YouTube video player'
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                referrerPolicy='strict-origin-when-cross-origin'
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <p>Aucune vidéo disponible.</p>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    )
}
