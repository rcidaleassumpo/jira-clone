import db from "../index";
import { CreateProject } from "../../pages/projects";

export interface Issue {}

export interface Project {
  name: string;
  type: string;
  lead: string;
  template: string;
  key: string;
  issues: Issue[];
}

export function getProjects(): Promise<Project[]> {
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

export function getProjectByQuery(objToValidate: any) {
  return new Promise((res, rej) => {
    db.projects.findOne(objToValidate, (_, doc) => {
      try {
        res(doc);
      } catch (e) {
        rej(e);
      }
    });
  });
}

export function insertProject(projectDate: CreateProject) {
  return new Promise((res, rej) => {
    // inserting the lead hardcoded but it should be
    // coming from the active user.
    // template information hardcoded as well since I didn't
    // want to bother yet with this logic.
    db.projects.insert(
      {
        ...projectDate,
        type: "Classic Business",
        lead: "Renan Cidale",
        template: "Kanban",
      },
      (e) => {
        if (e) {
          rej();
        } else {
          res();
        }
      }
    );
  });
}
