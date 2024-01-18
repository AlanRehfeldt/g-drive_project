import { Router } from "express";

import { usersRouter } from "./users.routes";
import { sessionRouter } from "./session.routes";
import { filesRouter } from "./files.routes";
import { foldersRouter } from "./folder.routes";
import { filesPermissionRouter } from "./filesPermission.routes";
import { foldersPermissionRouter } from "./foldersPermission.routes";

export const routes = Router();
routes.use("/users", usersRouter);
routes.use("/session", sessionRouter);
routes.use("/files", filesRouter);
routes.use("/folders", foldersRouter);
routes.use("/filesPermission", filesPermissionRouter);
routes.use("/foldersPermission", foldersPermissionRouter);
