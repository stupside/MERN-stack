import { searchMoviesReqBodySchema, searchMoviesResBodySchema } from "api";

import { request } from "../../core/clients/tmdb";
import { HttpError } from "../../core/errors/http";
import { requestHandler } from "../../core/express/handler";
import { getMovieByIdParamsSchema, getMovieByIdResBodySchema } from "libraries/api/schemas/movies";

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

    const movie = await request(client => client.GET(`/3/movie/{movie_id}`, {
        params: {
            path: {
                movie_id: req.params.id
            }
        }
    }));

    if (movie.error) {
        return next(new HttpError(502, "Failed to fetch movie details"));
    }

    if (!movie.data.id) {
        return next(new HttpError(500, "Malformed response from TMDB"));
    }

    return res.json({
        tmdbId: movie.data.id,
    });
});