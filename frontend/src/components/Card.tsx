import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/graphql/generated/schema";

export default function Card({
  id,
  title,
  slug,
  completion_date,
  src_picture,
  excerpt,
  prof_env,
  company_name,
  technologies = [],
  team_members = [],
}: ProjectCard) {
  return (
    <article>
      <div className="project-card">
        <figure className="illustration">
          <Image src={src_picture || "/projects_pics/default-image.png"} width={500} height={500} alt={`Capture d'écran du projet ${title}`} />
        </figure>
        <div className="project-card-body">
          <h3>{title}</h3>
          {excerpt && <p>{excerpt}</p>}
          <div>
            <p>Equipe :</p>
            {team_members && team_members.length > 0 ? (
              <ul>
                {team_members.map((member, index) => (
                  <li key={index}>{member?.name}</li>
                ))}
              </ul>
            ) : (
              <p>Aucun membre d'équipe défini.</p>
            )}
          </div>
          <div>
            <p>Technologies :</p>
            {technologies.length > 0 ? (
              <ul>
                {technologies.map((tech, index) => (
                  <li key={index}>{tech?.name}</li>
                ))}
              </ul>
            ) : (
              <p>Aucune technologie définie.</p>
            )}
          </div>
          <Link href={`/projet/${slug}`} className="read-more">
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
}
