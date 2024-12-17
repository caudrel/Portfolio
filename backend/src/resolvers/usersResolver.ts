import { Resolver, Query } from "type-graphql";
import { User } from "../entities/user";

@Resolver(User)
class UsersResolver {
  @Query(() => [User])
  async users() {
    return User.find();
  }
}

export default UsersResolver;
