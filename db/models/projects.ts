// import { CreateProject } from "../../pages/projects";
import Database from "../index";

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
  private db: any;
  private projectCollection: any;
  constructor() {}

  private async start() {
    this.db = await new Database().start();
    this.projectCollection = await this.db.collection("projects");
  }

  private async parseResponse(response: any) {
    return JSON.parse(JSON.stringify(await response));
  }
  async getProjects() {
    await this.start();
    return this.parseResponse(this.projectCollection.find().toArray());
  }

  async getProject(query: any): Promise<null | Project> {
    await this.start();
    const result = await this.projectCollection.findOne(query);
    return result;
  }

  async deleteAll() {
    await this.start();
    await this.projectCollection.deleteMany();
  }

  async insertProject(projectData: any) {
    await this.start();
    const result = await this.projectCollection.insertOne({
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
