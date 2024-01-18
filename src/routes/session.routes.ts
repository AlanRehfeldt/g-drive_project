import { Router } from "express";
import { SessionController } from "../controllers/sessionController";

const sessionController = new SessionController();

export const sessionRouter = Router();
sessionRouter.post("/", sessionController.create);

