import { buildSchema } from 'type-graphql'
import ProjectsResolver from './resolvers/projectsResolver'
import UsersResolver from './resolvers/usersResolver'
import TeamMembersResolver from './resolvers/teamMembersResolver'
import TechnologiesResolver from './resolvers/technologiesResolver'
import { ContactResolver } from 'resolvers/contactResolver'

export default buildSchema({
    resolvers: [
        ProjectsResolver,
        UsersResolver,
        TeamMembersResolver,
        TechnologiesResolver,
    ],
})
