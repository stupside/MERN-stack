import { searchMoviesReqBodySchema, searchMoviesResBodySchema } from "api";

import { request } from "../../core/clients/tmdb";
import { HttpError } from "../../core/errors/http";
import { requestHandler } from "../../core/express/handler";

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