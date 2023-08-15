import { Express, Request, Response } from "express";
import typeormProductsRouter from "../controllers/message.controller";

const routerSetup = (app: Express) =>
  app

    .get("/", async (req: Request, res: Response) => {
      res.send("Hello From SHASEC Server!");
    })
    .use("/api/messages", typeormProductsRouter);

export default routerSetup;
