import { Router } from "express"

import { searchMovies } from "../controllers/movies";

export const moviesRouter = Router();

moviesRouter.post("/", searchMovies);