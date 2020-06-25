import { MongoClient } from "mongodb";

class Database {
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
    if (!this.connection) {
      this.connection = await this.client.connect();
    }
    return this.connection.db(process.env.MONGO_DB_NAME);
  }
}

export default new Database();
