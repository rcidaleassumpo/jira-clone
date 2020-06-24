import { NextApiRequest, NextApiResponse } from "next";
import { insertProject } from "../../../db/models/projects";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      try {
        await insertProject(req.body);
        res.status(201).send("ok");
      } catch {
        res.status(500).send({ message: "notok" });
      }
  }
};

export default handler;
