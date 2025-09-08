import type { z } from "zod";

import type { FC } from "react";

import type { searchMoviesResBodySchema } from "libraries/api";

import { Movie } from "./Movie";

export const Movies: FC<{
    movies: z.infer<typeof searchMoviesResBodySchema>
}> = ({ movies }) => {
    return (
        <div>
            {movies.map((movie) => (
                <Movie key={movie.tmdbId} movie={movie} />
            ))}
        </div>
    );
}