import { request } from "../clients/tmdb";
import Movie from "../domain/movie";
import { HttpError } from "../errors/http";

export const getMovie = async (id: number) => {

    if (await Movie.countDocuments({ ref: id })) {
        return Movie.findOne({ ref: id });
    }

    const movie = await request((client) => client.GET("/3/movie/{movie_id}", {
        params: {
            path: {
                movie_id: id,
            }
        }
    }));
    if (!movie.data) {
        return new HttpError(404, "Movie not found");
    }

    return new Movie({
        ref: movie.data.id,
        title: movie.data.title,
    }).save();
}