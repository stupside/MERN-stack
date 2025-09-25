import { Router } from "express";

import {
  controlPlayer,
  dispatchEvent,
  getListeners,
  listenPlayer,
} from "../controllers/players";
import authMiddleware from "../middlewares/auth";

export const playersRouter = Router();
playersRouter.use(authMiddleware);

playersRouter.get("/:id/listen", ...listenPlayer);

playersRouter.post("/:id/control", ...controlPlayer);
playersRouter.get("/:id/listeners", ...getListeners);
playersRouter.post("/:id/dispatch", ...dispatchEvent);
