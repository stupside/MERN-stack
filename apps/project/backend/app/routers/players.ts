import { Router } from "express";

import {
  dispatchEvent,
  getListeners,
  listenPlayer,
} from "../controllers/players";
import authMiddleware from "../middlewares/auth";

export const playersRouter = Router();
playersRouter.use(authMiddleware);

playersRouter.get("/:id/listen", ...listenPlayer);

playersRouter.get("/:id/listeners", ...getListeners);
playersRouter.post("/:id/dispatch", ...dispatchEvent);
