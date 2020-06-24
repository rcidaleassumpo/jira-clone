import { NextApiRequest, NextApiResponse } from "next";
import { getProjectByQuery } from "../../../db/models/projects";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const project = await getProjectByQuery(req.query);
      res.json({ data: { validation: !project, project } });
  }
};

export default handler;
