import { Resolver, Query, Arg, Int } from "type-graphql";
import { Project, ProjectCard } from "../entities/project";
import { TeamMemberWOProjectRelation } from "../entities/team_member";
import { TechnologyWOProjectRelation } from "../entities/technology";

@Resolver(Project)
class ProjectsResolver {
  // @Query(() => [Project], { nullable: true })
  // async projects() {
  //   const projects = await Project.find({ relations: ["team_members", "technologies"] });
  //   return projects.length > 0 ? projects : null;
  // }

  @Query(() => [ProjectCard], { nullable: true })
  async projects(@Arg("technologyIds", () => [Int], { nullable: true }) technologyIds?: number[]): Promise<ProjectCard[]> {
    let projects;

    if (!technologyIds || technologyIds.length === 0) {
      // Si aucun ID de technologie n'est sélectionné, renvoyez tous les projets
      projects = await Project.find({ relations: ["team_members", "technologies"] });
    } else {
      // Si des IDs de technologie sont passés, on va récupérer les projets ayant au moins une de ces technologies
      projects = await Project.createQueryBuilder("project")
        .innerJoin("project.technologies", "technology", "technology.id IN (:...technologyIds)", { technologyIds })
        .leftJoinAndSelect("project.technologies", "loadedTechnology")
        .leftJoinAndSelect("project.team_members", "team_member")
        .getMany();
    }

    // Retourner les projets
    return projects.map((project) => ({
      id: project.id,
      title: project.title,
      slug: project.slug,
      completion_date: project.completion_date,
      excerpt: project.excerpt,
      prof_env: project.prof_env,
      company_name: project.company_name,
      src_picture: project.src_picture,

      // Mapper les technologies pour ne retourner que les champs nécessaires
      technologies: project.technologies.map((tech) => ({
        id: tech.id,
        name: tech.name,
        src_icon: tech.src_icon,
      })) as TechnologyWOProjectRelation[],

      // Mapper les membres de l'équipe pour ne retourner que les champs nécessaires
      team_members: project.team_members?.map((member) => ({
        id: member.id,
        name: member.name,
        linkedin: member.linkedin,
      })) as TeamMemberWOProjectRelation[],
    }));
  }

  @Query(() => Project, { nullable: true })
  async projectBySlug(@Arg("slug") slug: string) {
    const project = await Project.findOne({
      where: { slug },
      relations: ["team_members", "technologies"],
    });
    return project || null;
  }
}

export default ProjectsResolver;
