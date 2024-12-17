import { useProjectBySlugQuery } from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";

interface Project {
  title: string;
  excerpt: string;
  description: string;
  src: string;
  alt: string;
  technologies: { name: string; src_icon: string }[];
  team: string[];
  slug: string;
}

export default function Project() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, loading, error } = useProjectBySlugQuery({
    variables: { slug: slug as string },
    fetchPolicy: "no-cache",
    skip: !slug,
  });

  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const onHover = (name: string) => setHoveredTech(name);
  const onLeave = () => setHoveredTech(null);

  console.log(data?.projectBySlug);

  const project = data ? data.projectBySlug : null;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  if (!project) return <p>Pas de project avec ce nom</p>;

  return (
    <div className="project-prez">
      <div className="project-frame">
        <h1>{project.title}</h1>
        <Image
          className="project-pic"
          src={project.src_picture || "/projects_pics/default-image.png"}
          alt={`Capture d'écran du projet ${project.title}` || "Pas de capture d'écran pour cen projet"}
          width={1000}
          height={800}
        />
        <h2>Technologies utilisées</h2>
        <ul>
          <div className="technos">
            {project.technologies?.map((tech) => (
              <div>
                <li key={tech.name}>
                  <Image
                    className="tech-icon"
                    onMouseEnter={() => onHover(tech.name)}
                    onMouseLeave={onLeave}
                    src={tech.src_icon || "/projects_pics/default-image.png"}
                    alt={`Logo ${tech.name || "non spécifiée"}`}
                    width={60}
                    height={60}
                  />
                </li>
                {hoveredTech === tech.name && <p>{tech.name}</p>}
              </div>
            ))}
          </div>
        </ul>
        <h2>Description du projet</h2>
        <p>{project.description}</p>
      </div>
    </div>
  );
}
