import { Router } from "express"

import { createParty, getPartyById } from "../controllers/parties";

export const partiesRouter = Router();

partiesRouter.post("/", createParty);
partiesRouter.get("/:id", getPartyById);