import { Resolver, Query } from "type-graphql";
import { Book } from "./../entities/book";

@Resolver(Book)
class BooksResolver {
  @Query(() => [Book])
  async books() {
    return await Book.find();
  }
}

export default BooksResolver;
