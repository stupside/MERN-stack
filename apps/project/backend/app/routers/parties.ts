import { Router } from "express";

import {
  addMovieToWatchlist,
  createParty,
  getAllParties,
  getPartyById,
  joinParty,
  leaveParty,
  deleteParty,
  removeMovieFromWatchlist,
} from "../controllers/parties";
import authMiddleware from "../middlewares/auth";

export const partiesRouter = Router();
partiesRouter.use(authMiddleware);

partiesRouter.post("/", ...createParty);
partiesRouter.get("/", ...getAllParties);
partiesRouter.get("/:id", ...getPartyById);
partiesRouter.post("/join", ...joinParty);
partiesRouter.post("/:id/leave", ...leaveParty);
partiesRouter.delete("/:id", ...deleteParty);
partiesRouter.post("/:id/movies/:movie", ...addMovieToWatchlist);
partiesRouter.delete("/:id/movies/:movie", ...removeMovieFromWatchlist);
