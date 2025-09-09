import type { getPartyByIdResBodySchema } from "api/schemas/parties";
import type { FC } from "react";
import type z from "zod";
import { Movie } from "./Movie";

export const Movies: FC<{
    movies: z.infer<typeof getPartyByIdResBodySchema>["movies"];
    party: string;
}> = ({ movies, party }) => {
    return <div>
        {movies.length === 0 ? (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No movies yet</p>
                <p className="text-gray-400 text-sm mt-2">Add some movies to your watchlist</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {movies.map(movie => (
                    <Movie key={movie.id} movie={movie} party={party} />
                ))}
            </div>
        )}
    </div>;
}