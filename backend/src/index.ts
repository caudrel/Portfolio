// console.log("coucou");
import "reflect-metadata";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import db from "./db";
import schema from "./schema";
import http from "http";
import { User } from "./entities/user";

const port = 4000;

export interface MyContext {
  req: express.Request;
  res: express.Response;
  user: User | null;
}

export interface Payload {
  email: string;
}

const app = express();
const httpServer = http.createServer(app);

schema.then(async (schema) => {
  await db.initialize();
  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000", "https://studio.apollographql.com", "https://staging.caudrel.com"],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        let user: User | null = null;
        return { req, res, user };
      },
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`graphql server listening on http://localhost:${port}/`);
});

// buildSchema({ resolvers: [TechnologiesResolver, ProjectsResolver, UsersResolver, TeamMembersResolver] }).then(async (schema) => {
//   await db.initialize();
//   const server = new ApolloServer({ schema });
//   const { url } = await startStandaloneServer(server, { listen: { port } });
//   console.log(`graphql server listening on ${url}`);
// });
