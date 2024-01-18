import { Router } from "express";
import { FilesPermissionController } from "../controllers/filesPermissionController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const filesPermissionController = new FilesPermissionController();

export const filesPermissionRouter = Router();

filesPermissionRouter.use(ensureAuthenticated);

filesPermissionRouter.post("/", filesPermissionController.create);
filesPermissionRouter.put("/:id", filesPermissionController.update);
filesPermissionRouter.delete("/:id", filesPermissionController.delete);
