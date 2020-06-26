import { NextApiRequest, NextApiResponse } from "next";
import ProjectService from "../../../db/models/projects";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await ProjectService.insertProject(req.body);
      return res.status(201).send("ok");
  }
};

export default handler;
