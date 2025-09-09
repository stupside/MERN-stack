import type { getPartyByIdResBodySchema } from "api/schemas/parties";
import type { FC } from "react";
import type z from "zod";
import { MoviesGrid } from "../../../../../../../core/components/movies";
import { Movie } from "./Movie";

export const Movies: FC<{
    party: string;
    movies: z.infer<typeof getPartyByIdResBodySchema>["movies"];
}> = ({ movies, party }) => {
    return (
        <MoviesGrid
            movies={movies}
            renderMovie={(movie) => (
                <Movie key={movie.id} movie={movie} party={party} />
            )}
            emptyState={{
                title: "No movies yet",
                subtitle: "Add some movies to your watchlist",
            }}
        />
    );
};