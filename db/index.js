import Datastore from "nedb";

export default {
  projects: new Datastore({
    autoload: true,
    filename: "projects.db",
  }),
};
