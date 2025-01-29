import { Resolver, Arg, Query, Mutation, Ctx } from "type-graphql";
import { User, UserWOPassword, CreateUserInput, ResponseMessage, InputLogin } from "../entities/user";
import crypto from "crypto";
import * as argon2 from "argon2";
import { MyContext } from "..";
import Cookies from "cookies";
import { SignJWT } from "jose";
import { GraphQLError } from "graphql";

export async function findUserByEmail(email: string) {
  return await User.findOne({
    where: { email },
  });
}

export async function createUser({ first_name, last_name, email, password }: CreateUserInput) {
  const token = crypto.randomBytes(32).toString("hex");

  const newUser = await User.create({
    last_name,
    first_name,
    email,
    password,
    token: token,
  }).save();

  return newUser;
}

@Resolver(User)
class UsersResolver {
  @Query(() => [User])
  async users() {
    return User.find();
  }

  @Query(() => ResponseMessage)
  async login(@Arg("infos") infos: InputLogin, @Ctx() ctx: MyContext) {
    const user = await findUserByEmail(infos.email);

    if (!user) {
      throw new GraphQLError(`Veuillez vérifier vos informations`);
    }

    const isPasswordValid = await argon2.verify(user.password, infos.password);

    const responseMessage = new ResponseMessage();
    if (isPasswordValid) {
      const token = await new SignJWT({ email: user.email })
        .setProtectedHeader({ alg: "HS256", typ: "jwt" })
        .setExpirationTime("2h")
        .sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`));

      const cookies = new Cookies(ctx.req, ctx.res);
      cookies.set("token", token, { httpOnly: true });

      responseMessage.message = "Bienvenue!";
      responseMessage.success = true;
    } else {
      responseMessage.message = "Vérifiez vos informations";
      responseMessage.success = false;
    }

    return responseMessage;
  }

  @Mutation(() => UserWOPassword)
  async register(@Arg("data") data: CreateUserInput) {
    const user = await findUserByEmail(data.email);
    if (user) {
      throw new Error("Email already used");
    }
    const newUser = await createUser(data);
    return newUser;
  }
}

export default UsersResolver;
