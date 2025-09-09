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
        },
    }));
    if (movies.error) {
        return next(new HttpError(502, `Failed to fetch movies: ${JSON.stringify(movies)}`));
    }
    if (!movies.data.results) {
        return next(new HttpError(500, "Malformed response from TMDB"));
    }

    return res.json(movies.data.results.map(movie => ({
        ref: movie.id,
        title: movie.title || null,
        genres: movie.genre_ids?.map(id => ({ id })) || [],
        rating: movie.vote_average || null,
        release: movie.release_date || null,
        overview: movie.overview || null,
        images: {
            poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
            backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : null,
        },
        language: movie.original_language || null,
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
        ref: movie.ref,
        title: movie.title || null,
        rating: movie.rating || null,
        genres: movie.genres.map(genre => ({ id: genre.id, name: genre.name || null })),
        release: movie.release || null,
        overview: movie.overview || null,
        language: movie.language || null,
        images: {
            poster: movie.images.poster ? `https://image.tmdb.org/t/p/w500${movie.images.poster}` : null,
            backdrop: movie.images.backdrop ? `https://image.tmdb.org/t/p/w500${movie.images.backdrop}` : null,
        },
        production: movie.production.map(company => ({ id: company.id, company: company.company || null })),
    });
});