import { Router } from "express";

import { getMovieById, searchMovies } from "../controllers/movies";

export const moviesRouter = Router();

moviesRouter.post("/", ...searchMovies);
moviesRouter.get("/:id", ...getMovieById);
