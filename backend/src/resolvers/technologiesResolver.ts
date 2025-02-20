import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { GraphQLError } from 'graphql'
import { Technology, TechnologyInput } from '../entities/technology'
import { validate } from 'class-validator'

@Resolver(Technology)
class TechnologiesResolver {
    @Query(() => [Technology], { nullable: true })
    async technologies() {
        const technologies = await Technology.find({ relations: ['projects'] })
        return technologies.length > 0 ? technologies : null
    }

    @Mutation(() => Technology)
    async createTechnology(
        @Arg('data', { validate: true }) data: TechnologyInput
    ): Promise<Technology> {
        // const newTechnology = new Technology();
        // const { name, src_icon } = data;
        // Object.assign(newTechnology, { name, src_icon });
        // const { id } = await newTechnology.save();
        // return Technology.findOneOrFail({
        //   where: { id },
        // });

        // return Technology.create({ name, src_icon }).save();

        const newTechnology = new Technology()

        const { name, src_icon } = data

        const finalSrc = `/technos_icons/${src_icon}`

        Object.assign(newTechnology, { name, src_icon: finalSrc })

        const errors = await validate(newTechnology)

        if (errors.length !== 0) {
            throw new GraphQLError('données incorrectes', {
                extensions: { errors },
            })
        }
        const { id } = await newTechnology.save()

        return Technology.findOneOrFail({
            where: { id },
        })
    }
}

export default TechnologiesResolver
