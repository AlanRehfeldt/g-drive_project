import { Router } from "express";
import { FoldersPermissionController } from "../controllers/foldersPermissionController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const foldersPermissionController = new FoldersPermissionController();

export const foldersPermissionRouter = Router();

foldersPermissionRouter.use(ensureAuthenticated);

foldersPermissionRouter.post("/", foldersPermissionController.create);
foldersPermissionRouter.put("/:id", foldersPermissionController.update);
foldersPermissionRouter.delete("/:id", foldersPermissionController.delete);
