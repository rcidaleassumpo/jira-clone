import { MongoClient } from "mongodb";

export default class Database {
  connection: any;
  db: any;
  client: any;
  constructor() {
    const mongoURL = process.env.MONGO_DB_URL || "";
    this.client = new MongoClient(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async start() {
    this.connection = await this.client.connect();
    console.info("db name..", process.env.MONGO_DB_NAME);
    console.info("connection..", this.connection);
    return this.connection.db(process.env.MONGO_DB_NAME);
  }
}
