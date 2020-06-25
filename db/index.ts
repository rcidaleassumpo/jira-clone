import { MongoClient } from "mongodb";

export default class Database {
  connection: any;
  db: any;
  client: any;
  constructor() {
    const mongoURL = process.env.MONGO_DB_URL || "";
    console.info("mongoURL", mongoURL);
    console.info("db name..", process.env.MONGO_DB_NAME);
    this.client = new MongoClient(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async start() {
    if (!this.connection) {
      this.connection = await this.client.connect();
    }
    return this.connection.db(process.env.MONGO_DB_NAME);
  }
}
