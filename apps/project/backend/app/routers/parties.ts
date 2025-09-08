import { Router } from "express"

import { createParty, getAllParties, getPartyById } from "../controllers/parties";

export const partiesRouter = Router();

partiesRouter.post("/", createParty);
partiesRouter.get("/", getAllParties);
partiesRouter.get("/:id", getPartyById);