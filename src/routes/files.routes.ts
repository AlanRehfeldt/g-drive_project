import { Router } from "express";
import { FilesController } from "../controllers/filesController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const filesController = new FilesController();

export const filesRouter = Router();

filesRouter.use(ensureAuthenticated);

filesRouter.post("/", filesController.create);
filesRouter.put("/:id", filesController.update);
