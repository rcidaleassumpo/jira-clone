import { MongoClient, Db } from "mongodb";
import { Project } from "./models/projects";

let connection;
let db!: Db;

export default (async () => {
  const mongoURL = process.env.MONGO_DB_URL || "";
  const client = new MongoClient(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (!connection) {
    connection = await client.connect();
    db = connection.db(process.env.MONGO_DB_NAME);
  }

  return {
    projects: db.collection<Project>("projects"),
  };
})();
