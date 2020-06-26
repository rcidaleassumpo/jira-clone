// import { CreateProject } from "../../pages/projects";
import db from "../index";

export interface Issue {}

export interface Project {
  name: string;
  type: string;
  lead: string;
  template: string;
  key: string;
  issues: Issue[];
}

class ProjectsService {
  constructor() {}

  private async parseResponse(response: any) {
    return JSON.parse(JSON.stringify(await response));
  }

  async getProjects() {
    const projects = (await db).projects?.find().toArray();
    return this.parseResponse(projects);
  }

  async getProject(query: any): Promise<null | Project> {
    const result = (await db).projects?.findOne(query);
    return this.parseResponse(result);
  }

  async insertProject(projectData: any) {
    const result = (await db).projects?.insertOne({
      ...projectData,
      type: "Classic Business",
      lead: "Renan Cidale",
      template: "Kanban",
      issues: [],
    });

    return result;
  }
}

export default new ProjectsService();
