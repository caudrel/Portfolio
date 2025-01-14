// import { useState } from "react";
import Card from "./Card";
import { ProjectCard, useProjectsQuery, useTechnologiesQuery } from "@/graphql/generated/schema";
import { useState, useEffect, use } from "react";

export default function Projects() {
  const [technoIds, setTechnoIds] = useState<number[]>([]);

  const {
    data: projectsData,
    loading: projectsLoading,
    error: projectsError,
  } = useProjectsQuery({
    variables: {
      technologyIds: technoIds.length > 0 ? technoIds : undefined,
    },
  });

  useEffect(() => {
    useProjectsQuery;
  }, [technoIds]);

  const { data: technologiesData, loading: technologiesLoading, error: technologiesError } = useTechnologiesQuery({});

  const handleTechnoClick = (technoId: number) => {
    setTechnoIds(
      (prevTechnoIds) =>
        prevTechnoIds.includes(technoId)
          ? prevTechnoIds.filter((id) => id !== technoId) // Supprime si déjà présent
          : [...prevTechnoIds, technoId] // Ajoute sinon
    );
    console.log(technoIds);
  };

  if (projectsLoading || technologiesLoading) return <p>Loading...</p>;
  if (projectsError || technologiesError) return <p>Error...</p>;
  return (
    <section className="projects">
      <p className="text-stroke bg-dark">PROJETS</p>
      <h2>Technologies</h2>

      <div className="display-techno-btn">
        {technologiesData?.technologies?.map((techno) => (
          <button
            className={`button-techno ${technoIds.includes(techno.id) ? "selected" : ""}`}
            key={techno.id}
            onClick={() => handleTechnoClick(techno.id)}
          >
            {techno?.name}
          </button>
        )) || <p>Aucune technologie disponible.</p>}
      </div>

      <div className="projects-list">
        {projectsData?.projects && projectsData.projects.length > 0 ? (
          projectsData.projects.map((project) => <Card key={project.id} {...project} />)
        ) : (
          <p>Aucun projet disponible.</p>
        )}
      </div>
    </section>
  );
}
