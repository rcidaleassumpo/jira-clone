import { NextApiRequest, NextApiResponse } from "next";
import { getProjectByName } from "../../../db/models/projects";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      const hasProject = await getProjectByName(req.body.name);
      res.json({ data: !hasProject });
  }
};

export default handler;
