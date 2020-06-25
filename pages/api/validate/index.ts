import { NextApiRequest, NextApiResponse } from "next";
import ProjectService from "../../../db/models/projects";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const project = await ProjectService.getProject(req.query);
      res.json({ data: project });
  }
};

export default handler;
