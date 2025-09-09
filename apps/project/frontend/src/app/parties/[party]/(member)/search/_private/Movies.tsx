"use client";

import type { searchMoviesResBodySchema } from "api/schemas/movies";
import type { FC } from "react";
import type { z } from "zod";
import {
  MovieCard,
  MoviesGrid,
} from "../../../../../../core/components/movies";

export const Movies: FC<{
  name?: string;
  party: string;
  movies: z.infer<typeof searchMoviesResBodySchema>;
}> = ({ name, party, movies }) => {
  return (
    <MoviesGrid
      movies={movies}
      renderMovie={(movie) => (
        <MovieCard
          key={movie.ref}
          movie={{
            ref: movie.ref,
            title: movie.title,
            rating: movie.rating,
            images: {
              poster: movie.images.poster,
              backdrop: movie.images.backdrop,
            },
            release: movie.release,
            language: movie.language,
          }}
          href={`/parties/${party}/search/${movie.ref}`}
        />
      )}
      emptyState={{
        title: name?.trim()
          ? "No movies found"
          : "Start typing to search for movies",
        subtitle: name?.trim()
          ? "Try a different search term"
          : "Enter a movie title above",
      }}
    />
  );
};
