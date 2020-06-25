import { MongoClient } from "mongodb";

export default class Database {
  connection: any;
  db: any;
  client: any;
  constructor() {
    const mongoURL = process.env.MONGO_DB_URL || "";
    console.info("MONGOurl", mongoURL);
    try {
      this.client = new MongoClient(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (e) {
      console.error("something wrong happpend,...", e);
    }
  }

  async start() {
    this.connection = await this.client.connect();
    return this.connection.db(process.env.MONGO_DB_NAME);
  }
}
