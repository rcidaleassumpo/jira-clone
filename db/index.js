import Datastore from "nedb";
import path from "path";

export default {
  projects: new Datastore({
    autoload: true,
    filename: path.join(process.cwd(), "projects.db"),
  }),
};
