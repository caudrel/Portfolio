// import { useState } from "react";
import Card from './Card'
import {
    useProjectsQuery,
    useTechnologiesQuery,
} from '@/graphql/generated/schema'
import { useState } from 'react'

export default function Projects() {
    const [technoIds, setTechnoIds] = useState<number[]>([])

    const {
        data: projectsData,
        loading: projectsLoading,
        error: projectsError,
    } = useProjectsQuery({
        variables: {
            technologyIds: technoIds.length > 0 ? technoIds : undefined,
        },
    })

    const {
        data: technologiesData,
        loading: technologiesLoading,
        error: technologiesError,
    } = useTechnologiesQuery({})

    const handleTechnoClick = (
        event: React.MouseEvent<HTMLButtonElement>,
        technoId: number
    ) => {
        event.preventDefault() // ✅ Empêche le rechargement de la page
        setTechnoIds(prevTechnoIds =>
            prevTechnoIds.includes(technoId)
                ? prevTechnoIds.filter(id => id !== technoId)
                : [...prevTechnoIds, technoId]
        )
    }

    if (projectsLoading || technologiesLoading) return <p>Loading...</p>
    if (projectsError || technologiesError) return <p>Error...</p>
    return (
        <section className='projects' id='projets'>
            <p className='text-stroke bg-dark'>PROJETS</p>
            <h2>Technologies</h2>

            <div className='display-techno-btn'>
                {technologiesData?.technologies?.map(techno => (
                    <button
                        type='button'
                        className={`button-techno ${technoIds.includes(techno.id) ? 'selected' : ''}`}
                        key={techno.id}
                        onClick={e => handleTechnoClick(e, techno.id)}
                    >
                        {techno?.name}
                    </button>
                )) || <p>Aucune technologie disponible.</p>}
            </div>

            <button className='btn-secondary' onClick={() => setTechnoIds([])}>
                Réinitialiser
            </button>

            <div className='projects-list'>
                {projectsData?.projects && projectsData.projects.length > 0 ? (
                    projectsData.projects.map(project => (
                        <Card key={project.id} {...project} />
                    ))
                ) : (
                    <p>Aucun projet disponible.</p>
                )}
            </div>
        </section>
    )
}
