import db from "../index";

export function getProjects() {
  return new Promise((res, rej) => {
    db.projects.find({}, (err: any, docs: any) => {
      if (err) {
        rej(err);
      } else {
        res(docs);
      }
    });
  });
}

export function getProjectByName(projectName: string) {
  return new Promise((res, rej) => {
    db.projects.findOne({ name: projectName }, (e, doc) => {
      try {
        res(doc);
      } catch (e) {
        rej(e);
      }
    });
  });
}
