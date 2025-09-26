import { Router } from "express";

import { searchMovies, getMovieById } from "../controllers/movies";
import authMiddleware from "../middlewares/auth";

export const moviesRouter = Router();
moviesRouter.use(authMiddleware);

moviesRouter.post("/", ...searchMovies);
moviesRouter.get("/:id", ...getMovieById);
