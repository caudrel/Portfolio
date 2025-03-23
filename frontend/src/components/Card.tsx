import Image from 'next/image'
import Link from 'next/link'
import { ProjectCard } from '@/graphql/generated/schema'
import Icon from './icon'

export default function Card({
    title,
    slug,
    src_picture,
    excerpt,
    technologies = [],
    team_members = [],
}: ProjectCard) {
    return (
        <article>
            <div className='project-card'>
                <figure className='illustration'>
                    <Image
                        src={src_picture || '/projects_pics/default-image.png'}
                        width={500}
                        height={500}
                        alt={`Capture d'écran du projet ${title}`}
                        priority
                    />
                </figure>
                <div className='project-card-body'>
                    <h3>{title}</h3>
                    <div className='pitch-div'>
                        <h4>Pitch</h4>
                        {excerpt && <p>{excerpt}</p>}
                    </div>
                    <div className='member-div'>
                        <h4>Equipe :</h4>
                        <div>
                            {team_members && team_members.length > 0 ? (
                                <div className='icons'>
                                    {team_members?.map(member => (
                                        <Icon
                                            key={member.id}
                                            name={member.name}
                                            src_icon={member.src_icon}
                                            linkedin={member.linkedin}
                                            slug={slug}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p>Aucun membre d&apos;équipe défini.</p>
                            )}
                        </div>
                    </div>
                    <div className='technology-div'>
                        <h4>Technologies</h4>
                        <div>
                            {technologies.length > 0 ? (
                                <div className='icons'>
                                    {technologies.map(tech => (
                                        <Icon
                                            key={tech.id}
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
                    <div className='call-to-action-details'>
                        <Link
                            href={`/projet/${slug}`}
                            className='btn-secondary read-more'
                        >
                            Voir
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='20'
                                height='20'
                                fill='currentColor'
                                className='bi bi-plus-circle-fill'
                                viewBox='0 0 16 16'
                            >
                                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z' />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    )
}
