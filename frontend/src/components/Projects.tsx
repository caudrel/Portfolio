// import { useState } from "react";
import Card from "./Card";
import { ProjectCard, useProjectsQuery, useTechnologiesQuery } from "@/graphql/generated/schema";
import { useState, useEffect } from "react";

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

  const { data: technologiesData, loading: technologiesLoading, error: technologiesError } = useTechnologiesQuery({});

  // useEffect(() => {
  //   // Initialisation des IDs des technologies si nécessaire
  //   if (!technoIds.length) {
  //     setTechnoIds([]); // Exemple d'initialisation, peut-être des IDs par défaut
  //   }
  // }, [technoIds]);

  if (projectsLoading) return <p>Loading...</p>;
  if (projectsError) return <p>Error...</p>;
  return (
    <section className="projects">
      <p className="text-stroke bg-dark">PROJETS</p>
      <h2>Technologies</h2>
      <div className="display-techno-btn">
        {technologiesData?.technologies?.map((techno) => (
          <button className="button-techno" key={techno.id}>
            {techno?.name}
          </button>
        )) || <p>Aucune technologie disponible.</p>}
      </div>

      <div className="projects-list">
        {projectsData?.projects?.map((project) => <Card key={project.id} {...project} />) || <p>Aucun projet disponible.</p>}
      </div>
    </section>
  );
}
