import {
  useCreateProjectMutation,
  useCreateTeamMemberMutation,
  useProjectsQuery,
  useTeamMembersQuery,
  useTechnologiesQuery,
} from "@/graphql/generated/schema";
import { FormEvent, useEffect, useState, ChangeEvent } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";

export default function Projects() {
  const { data: projectsData, loading: projectsLoading, error: projectsError, refetch } = useProjectsQuery({});

  const [createProject] = useCreateProjectMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    // Convertir FormData en objet JSON brut
    const formJSON: any = Object.fromEntries(formData.entries());

    // Convertir les valeurs checkbox en booleans
    if (formJSON.prof_env !== undefined) {
      formJSON.prof_env = formJSON.prof_env === "on";
    } else {
      formJSON.prof_env = false; // Valeur par défaut pour une checkbox décochée
    }

    // Convertir les chaînes des champs de tableau en tableaux de nombres
    if (formData.getAll("team_members")) {
      formJSON.team_members = formData.getAll("team_members").map((id) => parseInt(id as string, 10));
    }
    if (formData.getAll("technologies")) {
      formJSON.technologies = formData.getAll("technologies").map((id) => parseInt(id as string, 10));
    }
    await createProject({ variables: { data: { ...formJSON } } });
    await refetch();
  };

  //paramétrage manuel
  const [isProfEnv, setIsProfEnv] = useState(false);
  const [teamMemberIds, setTeamMemberIds] = useState<number[]>([]);
  const [techIds, setTechIds] = useState<number[]>([]);

  const { data: teamMembersData, loading: teamMembersLoading, error: teamMembersError } = useTeamMembersQuery({});

  const { data: technologiesData, loading: technologiesLoading, error: technologiesError } = useTechnologiesQuery({});

  const handleTeamMemberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => Number(option.value));

    // Mettez à jour `teamMemberIds` pour refléter les membres sélectionnés
    setTeamMemberIds(selectedOptions);
  };

  const handleTechChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => Number(option.value));

    // Mettez à jour `techIds` pour refléter les technologies sélectionnées
    setTechIds(selectedOptions);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsProfEnv(e.target.checked);
    console.log("isProfEnv", isProfEnv);
  };

  if (projectsLoading) return <p>Loading...</p>;
  if (projectsError) return <p>Error...</p>;
  return (
    <Layout title="Admin Projects - Portfolio CAudrel">
      <section className="projects-page">
        <h1>Projets</h1>
        <div className="display-projects-table">
          {projectsData?.projects && projectsData.projects.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Exerpt</th>
                  <th>Durée</th>
                  <th>Date de livraison</th>
                  <th>En entreprise ?</th>
                </tr>
              </thead>
              <tbody>
                {projectsData.projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.id}</td>
                    <td>{project.title}</td>
                    <td>{project.excerpt}</td>
                    <td>{project.duration}</td>
                    <td>{project.completion_date}</td>
                    {project.prof_env ? <td>{project.company_name}</td> : <td>Non</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun projet disponible pour le moment.</p>
          )}
        </div>
        <h2>Ajouter un membre d'équipe</h2>
        <div className="project-form-frame">
          <form onSubmit={handleSubmit} className="form">
            <div className="labels">
              <div className="two-labels">
                <div>
                  <label className="label" htmlFor="title">
                    <span>Nom</span>
                  </label>
                  <input required type="text" name="title" id="title" placeholder="EasyGift" autoComplete="on" />
                </div>
                <div>
                  <label className="label" htmlFor="completion_date">
                    <span className="">Date de livraison</span>
                  </label>
                  <input required type="text" name="completion_date" id="completion_date" placeholder="2025-02-01" autoComplete="on" />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="duration">
                  <span>Durée du projet</span>
                </label>
                <input required type="text" name="duration" id="duration" placeholder="6 semaines étalées sur 6 mois" autoComplete="on" />
              </div>

              <div>
                <label className="label" htmlFor="excerpt">
                  <span>Résumé</span>
                </label>
                <input
                  required
                  type="text"
                  name="excerpt"
                  id="excerpt"
                  placeholder="Discutez avec vos proches pour trouver le cadeau idéal."
                  autoComplete="on"
                />
              </div>

              <div>
                <label className="label" htmlFor="description">
                  <span>Description</span>
                </label>
                <textarea
                  required
                  name="description"
                  id="description"
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  autoComplete="on"
                />
              </div>

              <div>
                <label className="label" htmlFor="area_of_improvement">
                  <span>Axes d'amélioration</span>
                </label>
                <textarea required name="area_of_improvement" id="area_of_improvement" placeholder="Design, sécurité, validation" autoComplete="on" />
              </div>

              <div className="checkbox">
                <input
                  type="checkbox"
                  name="prof_env"
                  id="prof_env"
                  checked={isProfEnv}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setIsProfEnv(isChecked);
                    console.log("isProfEnv", isChecked);
                  }}
                />
                <label htmlFor="prof_env">Réalisé en environnement professionnel</label>
              </div>

              <div className={`company ${isProfEnv ? "" : "hidden"}`}>
                <label className="label" htmlFor="company_name">
                  <span>Société</span>
                </label>
                <input type="text" name="company_name" id="company_name" placeholder="La French Tech Bordeaux" autoComplete="on" />
              </div>

              <div>
                <label className="label" htmlFor="src_picture">
                  <span>Photo d'illustration</span>
                </label>
                <input type="text" name="src_picture" id="src_picture" required placeholder="easygift.png" autoComplete="on" />
              </div>

              <div>
                <label className="label" htmlFor="src_video">
                  <span>Lien vidéo</span>
                </label>
                <input
                  type="text"
                  name="src_video"
                  id="src_video"
                  required
                  placeholder="https://www.youtube.com/watch?v=j7zJP4YhPeE&list=PL0gq6XlztxyAUUPWDnVQafYyZHkZGXz_3"
                  autoComplete="on"
                />
              </div>

              <div>
                <label className="label" htmlFor="team_members">
                  <span>Membres de l'équipe</span>
                </label>
                <select name="team_members" id="team_members" multiple onChange={handleTeamMemberChange}>
                  {teamMembersData?.teamMembers?.map((teamMember) => (
                    <option key={teamMember.id} value={teamMember.id}>
                      {teamMember.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label" htmlFor="technologies">
                  <span>Technologies employées</span>
                </label>
                <select name="technologies" id="technologies" multiple onChange={handleTechChange}>
                  {technologiesData?.technologies?.map((technology) => (
                    <option key={technology.id} value={technology.id}>
                      {technology.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-validation">
              <button className="btn-secondary">Enregistrer</button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
