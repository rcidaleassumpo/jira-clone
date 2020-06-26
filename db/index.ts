import { MongoClient } from "mongodb";

let connection;
let db;

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
    projects: db?.collection("projects"),
  };
})();
