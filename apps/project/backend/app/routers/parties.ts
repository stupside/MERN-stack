import { Router } from "express"

import { addMovieToWatchlist, createParty, getAllParties, getPartyById, joinParty, removeMovieFromWatchlist } from "../controllers/parties";

export const partiesRouter = Router();

partiesRouter.post("/", createParty);
partiesRouter.get("/", getAllParties);
partiesRouter.get("/:id", getPartyById);
partiesRouter.post("/join", joinParty);
partiesRouter.post("/:id/movies/:movie", addMovieToWatchlist);
partiesRouter.delete("/:id/movies/:movie", removeMovieFromWatchlist);