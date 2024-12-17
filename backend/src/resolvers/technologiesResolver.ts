import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Technology, TechnologyInput } from "../entities/technology";

@Resolver(Technology)
class TechnologiesResolver {
  @Query(() => [Technology], { nullable: true })
  async technologies() {
    const technologies = await Technology.find({ relations: ["projects"] });
    return technologies.length > 0 ? technologies : null;
  }

  @Mutation(() => Technology)
  async createTechnology(@Arg("data", { validate: true }) data: TechnologyInput): Promise<Technology> {
    const { name, src_icon } = data;
    const technology = new Technology();
    technology.name = name;
    technology.src_icon = src_icon;
    await technology.save();
    return technology;
  }
}

export default TechnologiesResolver;
