import type { z } from "zod";

import type { FC } from "react";

import type { searchMoviesResBodySchema } from "libraries/api";

import { Movie } from "./Movie";

export const Movies: FC<{
    movies: z.infer<typeof searchMoviesResBodySchema>
}> = ({ movies }) => {
    if (movies.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No movies found</p>
                <p className="text-gray-400 text-sm mt-2">Try searching for a different movie</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
                <Movie key={movie.ref} movie={movie} />
            ))}
        </div>
    );
}