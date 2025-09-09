"use client"

import type { z } from "zod";
import type { FC } from "react";
import type { searchMoviesResBodySchema } from "api/schemas/movies";
import { Movie } from "./Movie";

export const Movies: FC<{
    name?: string;
    party: string;
    movies: z.infer<typeof searchMoviesResBodySchema>;
}> = ({ name, party, movies }) => {
    return (
        <>
            {movies.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        {name?.trim() ? 'No movies found' : 'Start typing to search for movies'}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                        {name?.trim() ? 'Try a different search term' : 'Enter a movie title above'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <Movie key={movie.ref} party={party} movie={movie} />
                    ))}
                </div>
            )}
        </>
    );
};