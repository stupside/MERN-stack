import type { searchMoviesResBodySchema } from "libraries/api";
import type { FC } from "react";
import type { z } from "zod";
import Image from "next/image";

export const Movie: FC<{ movie: z.infer<typeof searchMoviesResBodySchema>[number] }> = ({ movie }) => {
    return <div>
        <h2>{movie.title}</h2>
        <div>TMDB ID: {movie.ref}</div>
        {movie.images.poster && <Image src={movie.images.poster} alt={`${movie.title} poster`} width={200} height={300} />}
        {movie.images.backdrop && <Image src={movie.images.backdrop} alt={`${movie.title} backdrop`} width={200} height={300} />}
    </div>
}