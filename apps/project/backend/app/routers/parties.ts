import { Router } from "express"

import { createParty, getAllParties, getPartyById, joinParty } from "../controllers/parties";

export const partiesRouter = Router();

partiesRouter.post("/", createParty);
partiesRouter.get("/", getAllParties);
partiesRouter.get("/:id", getPartyById);
partiesRouter.post("/:id/join", joinParty);