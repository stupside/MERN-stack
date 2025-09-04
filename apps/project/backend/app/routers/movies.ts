import { Router } from "express"

export const moviesRouter = Router();

moviesRouter.post("/", searchMovies);