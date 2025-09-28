import { Router } from "express";

import {
  dispatchEvent,
  listenPlayer,
} from "../controllers/players";
import authMiddleware from "../middlewares/auth";

export const playersRouter = Router();
playersRouter.use(authMiddleware);

playersRouter.get("/:id/listen", ...listenPlayer);
playersRouter.post("/:id/dispatch", ...dispatchEvent);
