import { Router } from "express";

import { getMovieById, searchMovies } from "../controllers/movies";
import authMiddleware from "../middlewares/auth";

export const moviesRouter = Router();
moviesRouter.use(authMiddleware);

moviesRouter.post("/", ...searchMovies);
moviesRouter.get("/:id", ...getMovieById);
