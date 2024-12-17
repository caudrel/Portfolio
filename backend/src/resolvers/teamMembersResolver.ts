import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { TeamMember } from "../entities/team_member";

@Resolver(TeamMember)
class TeamMembersResolver {
  @Query(() => [TeamMember], { nullable: true })
  async teamMembers() {
    const teamMembers = await TeamMember.find({ relations: ["projects"] });
    return teamMembers.length > 0 ? teamMembers : null;
  }

  @Mutation(() => TeamMember)
  async createTeamMember(@Arg("name") name: string, @Arg("linkedin", { nullable: true }) linkedin: string): Promise<TeamMember> {
    const teamMember = new TeamMember();
    teamMember.name = name;
    teamMember.linkedin = linkedin;
    await teamMember.save();
    return teamMember;
  }
}

export default TeamMembersResolver;
