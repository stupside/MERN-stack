import { getPartyByIdResBodySchema } from "api";
import type { FC } from "react";
import z from "zod";
import { Movie } from "./Movie";

export const Movies: FC<{
    movies: z.infer<typeof getPartyByIdResBodySchema>["movies"]
}> = ({ movies }) => {
    return <div>
        <h1>Movies Component</h1>
        <ul>
            {movies.map(movie => (
                <Movie key={movie.id} movie={movie} />
            ))}
        </ul>
    </div>;
}