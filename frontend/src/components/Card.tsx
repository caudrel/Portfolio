import Image from 'next/image'
import Link from 'next/link'
import { ProjectCard } from '@/graphql/generated/schema'

export default function Card({
    title,
    slug,
    src_picture,
    excerpt,
    technologies = [],
    //team_members = [],
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
                    <div>
                        <h4>Pitch</h4>
                        {excerpt && <p>{excerpt}</p>}
                    </div>

                    {/* <div>
            <h4>Equipe :</h4>
            <div>
              {team_members && team_members.length > 0 ? (
                <ul className="member-pics">
                  {team_members?.map((member) => (
                    <li key={member.name} className="member-pic">
                      <Image
                        src={member.src_icon || "/projects_pics/default-image.png"}
                        alt={`Photo de ${member.name || "non spécifiée"}`}
                        width={30}
                        height={30}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Aucun membre d'équipe défini.</p>
              )}
            </div>
          </div> */}
                    <div>
                        <h4>Technologies</h4>
                        <p>Technologies utilisées :</p>
                        <div>
                            {technologies.length > 0 ? (
                                <ul className='techno-icons'>
                                    {technologies.map(tech => (
                                        <li
                                            key={tech.name}
                                            className='techno-icon'
                                        >
                                            <Image
                                                src={
                                                    tech.src_icon ||
                                                    '/projects_pics/default-image.png'
                                                }
                                                alt={`Logo ${tech.name || 'non spécifiée'}`}
                                                width={30}
                                                height={30}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Aucune technologie définie.</p>
                            )}
                        </div>
                    </div>
                    <div className='call-to-action-details'>
                        <button className='btn-secondary'>
                            <Link
                                href={`/projet/${slug}`}
                                className='read-more'
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
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}
