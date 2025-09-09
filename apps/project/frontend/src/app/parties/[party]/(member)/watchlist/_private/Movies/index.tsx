import { getPartyByIdResBodySchema } from "api";
import type { FC } from "react";
import z from "zod";
import { Movie } from "./Movie";

export const Movies: FC<{
    movies: z.infer<typeof getPartyByIdResBodySchema>["movies"]
}> = ({ movies }) => {
    return <div>
        {movies.length === 0 ? (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No movies yet</p>
                <p className="text-gray-400 text-sm mt-2">Add some movies to your watchlist</p>
            </div>
        ) : (
            <div className="space-y-4">
                {movies.map(movie => (
                    <Movie key={movie.id} movie={movie} />
                ))}
            </div>
        )}
    </div>;
}