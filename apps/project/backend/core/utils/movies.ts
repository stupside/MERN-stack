import { request } from "../clients/tmdb";
import Movie, { type _IMovie } from "../domain/movie";
import { HttpError } from "../errors/http";

export const getMovie = async (id: number) => {
  if (await Movie.countDocuments({ ref: id })) {
    return Movie.findOne({ ref: id });
  }

  const movie = await request((client) =>
    client.GET("/3/movie/{movie_id}", {
      params: {
        path: {
          movie_id: id,
        },
      },
    }),
  );
  if (!movie.data) {
    return new HttpError(404, "Movie not found");
  }

  return new Movie({
    ref: movie.data.id,
    title: movie.data.title,
    rating: movie.data.vote_average,
    language: movie.data.original_language,
    genres:
      movie.data.genres?.map((genre) => ({ id: genre.id, name: genre.name })) ||
      [],
    release: movie.data.release_date,
    overview: movie.data.overview,
    production:
      movie.data.production_companies?.map((company) => ({
        id: company.id,
        company: company.name,
      })) || [],
    images: {
      poster: movie.data.poster_path,
      backdrop: movie.data.backdrop_path,
    },
  } satisfies _IMovie).save();
};
