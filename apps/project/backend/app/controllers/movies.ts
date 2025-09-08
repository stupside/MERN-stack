import { searchMoviesReqBodySchema, searchMoviesResBodySchema } from "api";

import { request } from "../../core/clients/tmdb";
import { HttpError } from "../../core/errors/http";
import { requestHandler } from "../../core/express/handler";
import { getMovieByIdParamsSchema, getMovieByIdResBodySchema } from "libraries/api/schemas/movies";
import { getMovie } from "../../core/utils/movies";

export const searchMovies = requestHandler({
    request: searchMoviesReqBodySchema,
    result: searchMoviesResBodySchema,
}, async (req, res, next) => {

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
});

export const getMovieById = requestHandler({
    params: getMovieByIdParamsSchema,
    result: getMovieByIdResBodySchema,
}, async (req, res, next) => {
    const movie = await getMovie(req.params.id);
    if (movie instanceof HttpError) {
        return next(movie);
    }
    if (!movie) {
        return next(new HttpError(500, "Failed to fetch or create movie"));
    }

    return res.json({
        tmdbId: movie.id,
    });
});