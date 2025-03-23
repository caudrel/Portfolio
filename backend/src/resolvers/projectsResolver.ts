import { Resolver, Query, Arg, Int, Mutation } from 'type-graphql'
import { Project, ProjectCard, ProjectInput } from '../entities/project'
import { TeamMember } from '../entities/team_member'
import { Technology } from '../entities/technology'
import { GraphQLError } from 'graphql'
import { validate } from 'class-validator'
import { In } from 'typeorm'

@Resolver(Project)
class ProjectsResolver {
    @Query(() => [ProjectCard], { nullable: true })
    async projects(
        @Arg('technologyIds', () => [Int], { nullable: true })
        technologyIds?: number[]
    ): Promise<ProjectCard[]> {
        const query = Project.createQueryBuilder('project')
            .leftJoinAndSelect('project.technologies', 'technology')
            .leftJoinAndSelect('project.team_members', 'team_member')

        if (technologyIds && technologyIds.length > 0) {
            query.innerJoin(
                'project.technologies',
                'filterTech',
                'filterTech.id IN (:...technologyIds)',
                { technologyIds }
            )
        }
        query.orderBy('project.completion_date', 'DESC')

        const projects = await query.getMany()

        return projects
    }

    @Query(() => Project, { nullable: true })
    async projectBySlug(@Arg('slug') slug: string) {
        const project = await Project.findOne({
            where: { slug },
            relations: ['team_members', 'technologies'],
        })
        return project || null
    }

    @Mutation(() => Project)
    async createProject(
        @Arg('data', { validate: true }) data: ProjectInput
    ): Promise<Project> {
        const {
            title,
            completion_date,
            duration,
            excerpt,
            description,
            area_of_improvement,
            prof_env,
            company_name,
            src_picture,
            src_video,
            team_members,
            technologies,
        } = data

        const project = new Project()
        const finalSrc = `/projects_pics/${src_picture}`
        const slugGenerated = title.toLowerCase().replace(/ /g, '-')

        Object.assign(project, {
            title,
            slug: slugGenerated,
            completion_date,
            duration,
            excerpt,
            description,
            area_of_improvement,
            prof_env,
            company_name,
            src_picture: finalSrc,
            src_video,
        })

        if (team_members && team_members.length > 0) {
            const members = await TeamMember.findBy({ id: In(team_members) })
            if (members.length !== team_members.length) {
                throw new GraphQLError(
                    "Certains membres de l'équipe spécifiés sont invalides."
                )
            }
            project.team_members = members
        }

        // Chargez les technologies à partir de la base de données
        if (technologies && technologies.length > 0) {
            const techs = await Technology.findBy({ id: In(technologies) })
            if (techs.length !== technologies.length) {
                throw new GraphQLError(
                    'Certaines technologies spécifiées sont invalides.'
                )
            }
            project.technologies = techs
        }

        const errors = await validate(this.projects)

        if (errors.length !== 0) {
            throw new GraphQLError('données incorrectes', {
                extensions: { errors },
            })
        }

        const { id } = await project.save()

        return Project.findOneOrFail({
            where: { id },
            relations: ['team_members', 'technologies'],
        })
    }
}

export default ProjectsResolver
