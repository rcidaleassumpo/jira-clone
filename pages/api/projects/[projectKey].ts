import { NextApiRequest, NextApiResponse } from "next";
import ProjectService from "../../../db/models/projects";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "DELETE":
      await ProjectService.deleteProject(req.query.projectKey as string);
      return res.status(200).send("ok");
  }
};

export default handler;
