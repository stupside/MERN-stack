import type { RequestHandler } from "express";

import z from "zod";

import { request } from "../../core/clients/tmdb";
import { HttpError } from "../../core/errors/http";

const searchMoviesReqBodySchema = z.object({
    name: z.string().min(1),
});

const searchMoviesResBodySchema = z.array(z.object({
    tmdbId: z.number(),
}));

export const searchMovies: RequestHandler<never, z.infer<typeof searchMoviesResBodySchema>, z.infer<typeof searchMoviesReqBodySchema>> = async (req, res, next) => {

    const movies = await request(client => client.GET("/3/search/movie", {
        params: {
            query: {
                query: req.body.name
            }
        }
    }));

    if (movies.error) {
        return next(new HttpError(502, "Failed to fetch movies"));
    }

    if (!movies.data.results) {
        return next(new HttpError(500, "Malformed response from TMDB"));
    }

    return res.json(movies.data.results.map(movie => ({
        tmdbId: movie.id,
    })));
};