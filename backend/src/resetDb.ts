import db from "./db";
import { Book } from "./entities/book";

async function clearDB() {
  const runner = db.createQueryRunner();
  await runner.query("SET session_replication_role = 'replica'");
  await Promise.all(db.entityMetadatas.map(async (entity) => runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`)));
  await Promise.all(db.entityMetadatas.map(async (entity) => runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`)));
  await runner.query("SET session_replication_role = 'origin'");
  await db.synchronize();
}

async function main() {
  await db.initialize();
  await clearDB();

  const book1 = Book.create({
    title: "Pierre",
    author: "Herman Melville",
  });

  await book1.save();
}

main();
