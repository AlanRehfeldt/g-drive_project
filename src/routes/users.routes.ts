import { Router } from "express";
import { UsersController } from "../controllers/usersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersController = new UsersController();

export const usersRouter = Router();
usersRouter.post("/", usersController.create);
usersRouter.put("/", ensureAuthenticated, usersController.update);
usersRouter.get("/", ensureAuthenticated, usersController.index);
