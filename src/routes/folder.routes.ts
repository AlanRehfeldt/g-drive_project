import { Router } from "express";
import { FoldersController } from "../controllers/foldersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const foldersController = new FoldersController();

export const foldersRouter = Router();

foldersRouter.use(ensureAuthenticated);

foldersRouter.post("/", foldersController.create);
foldersRouter.put("/:id", foldersController.update);
foldersRouter.get("/", foldersController.list);
foldersRouter.get("/shared/", foldersController.listShared);
