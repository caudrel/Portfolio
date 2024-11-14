import { buildSchema } from "type-graphql";
import BooksResolver from "./resolvers/booksResolver";

export default buildSchema({
  resolvers: [BooksResolver],
});
