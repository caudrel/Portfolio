import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { MemberInput, TeamMember } from "../entities/team_member";
import { validate } from "class-validator";
import { GraphQLError } from "graphql";

@Resolver(TeamMember)
class TeamMembersResolver {
  @Query(() => [TeamMember], { nullable: true })
  async teamMembers() {
    const teamMembers = await TeamMember.find({ relations: ["projects"] });
    return teamMembers.length > 0 ? teamMembers : null;
  }

  @Mutation(() => TeamMember)
  async createTeamMember(@Arg("data", { validate: true }) data: MemberInput): Promise<TeamMember> {
    const teamMember = new TeamMember();
    let { name, src_icon, linkedin } = data;
    const finalSrc = `/team_members_pics/${src_icon}`;

    Object.assign(teamMember, { name, linkedin, src_icon: finalSrc });
    const errors = await validate(teamMember);

    if (errors.length !== 0) {
      throw new GraphQLError("données incorrectes", { extensions: { errors } });
    }
    const { id } = await teamMember.save();

    return TeamMember.findOneOrFail({
      where: { id },
    });
  }
}

export default TeamMembersResolver;
