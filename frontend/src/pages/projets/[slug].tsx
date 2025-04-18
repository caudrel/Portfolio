import { useProjectBySlugQuery } from '@/graphql/generated/schema'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import ModalViewVideo from '@/components/video/modalVideoView'
import Icon from '@/components/icon'

interface Project {
    title: string
    excerpt: string
    description: string
    src: string
    alt: string
    technologies: { name: string; src_icon: string }[]
    team: string[]
    slug: string
}

export default function Project() {
    const router = useRouter()
    const { slug } = router.query
    const [isModalViewVideoOpen, setIsModalViewVideoOpen] = useState(false)

    const { data, loading, error } = useProjectBySlugQuery({
        variables: { slug: slug as string },
        fetchPolicy: 'no-cache',
        skip: !slug,
    })

    const [hoveredTech, setHoveredTech] = useState<string | null>(null)
    const onHover = (name: string) => setHoveredTech(name)
    const onLeave = () => setHoveredTech(null)

    const project = data ? data.projectBySlug : null

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error...</p>
    if (!project) return <p>Pas de project avec ce nom</p>

    return (
        <div className='project-prez'>
            <Link href={`/projets`} className='return'>
                Retour
            </Link>
            <div className='project-frame'>
                <h1>{project.title}</h1>
                <Image
                    className='project-pic'
                    src={
                        project.src_picture ||
                        '/projects_pics/default-image.png'
                    }
                    alt={
                        `Capture d'écran du projet ${project.title}` ||
                        "Pas de capture d'écran pour cen projet"
                    }
                    width={1000}
                    height={800}
                    priority
                />
                {project.src_video && (
                    <button
                        onClick={() => setIsModalViewVideoOpen(true)}
                        aria-label='Visionner la démo'
                        className='view-video'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            className='bi bi-play-circle-fill'
                            viewBox='0 0 16 16'
                        >
                            <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z' />
                        </svg>
                    </button>
                )}

                <div className='technology-div'>
                    <h2>Technologies utilisées</h2>
                    <div className='technos'>
                        <div>
                            {project.technologies.length > 0 ? (
                                <div className='icons'>
                                    {project.technologies.map(tech => (
                                        <Icon
                                            key='index'
                                            name={tech.name}
                                            src_icon={tech.src_icon}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p>Aucune technologie définie.</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className='block-vertical'>
                    <h2>Description du projet</h2>
                    <p>{project.description}</p>
                </div>

                <div className='block-vertical'>
                    <h2>Axes d&apos;amélioration</h2>
                    <p>{project.area_of_improvement}</p>
                </div>

                <div className='block-icons'>
                    <h2>Equipe projet</h2>
                    <div className='members'>
                        {project.team_members?.map(member => (
                            <div key={member.name}>
                                <div className='member-container'>
                                    <Link
                                        href={
                                            member.linkedin
                                                ? member.linkedin
                                                : ''
                                        }
                                        target='_blank'
                                    >
                                        <Image
                                            className='member-pic'
                                            src={
                                                member.src_icon ||
                                                '/projects_pics/default-image.png'
                                            }
                                            alt={`Photo de ${member.name || 'non spécifiée'}`}
                                            width={60}
                                            height={60}
                                        />
                                    </Link>
                                    <p>{member.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isModalViewVideoOpen && (
                <ModalViewVideo
                    isOpen={isModalViewVideoOpen}
                    handleClose={() => setIsModalViewVideoOpen(false)}
                    src_video={project.src_video}
                />
            )}
        </div>
    )
}
