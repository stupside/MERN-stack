import type { z } from "zod";

import type { FC } from "react";

import type { searchMoviesResBodySchema } from "libraries/api";

import { Movie } from "./Movie";

export const Movies: FC<{
    party: string,
    movies: z.infer<typeof searchMoviesResBodySchema>
}> = ({ party, movies }) => {
    if (movies.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-gray-500 text-lg mb-2">Start typing to search for movies</p>
                <p className="text-gray-400 text-sm">Enter a movie title in the search box above</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
                <Movie key={movie.ref} party={party} movie={movie} />
            ))}
        </div>
    );
}