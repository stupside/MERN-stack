import type { getPartyByIdSchema } from "api/schemas/parties";
import type { FC } from "react";
import type z from "zod";
import { MovieCard } from "../../../../../../../../core/components/movies";

export const Movie: FC<{
  movie: z.infer<typeof getPartyByIdSchema.result>["movies"][number];
  party: string;
}> = ({ movie, party }) => {
  return (
    <MovieCard
      movie={{
        ref: movie.id,
        title: movie.title,
        rating: movie.rating,
        images: movie.images,
        release: movie.release,
        language: movie.language,
      }}
      href={`/parties/${party}/movies/${movie.id}`}
    />
  );
};
