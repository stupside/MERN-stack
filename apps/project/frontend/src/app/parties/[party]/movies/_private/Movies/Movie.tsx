import type { searchMoviesResBodySchema } from "libraries/api";
import type { FC } from "react";
import type { z } from "zod";

export const Movie: FC<{ movie: z.infer<typeof searchMoviesResBodySchema>[number] }> = ({ movie }) => {
    return <div>{JSON.stringify(movie)}</div>;
}