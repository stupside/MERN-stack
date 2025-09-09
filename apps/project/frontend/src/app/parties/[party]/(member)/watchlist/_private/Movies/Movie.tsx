"use client";

import type { getPartyByIdResBodySchema } from "api/schemas/parties";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useActionState, useEffect } from "react";
import type z from "zod";
import {
  MovieCard,
  RemoveButton,
} from "../../../../../../../core/components/movies";
import { removeMovieFromWatchlist } from "../../../action";

export const Movie: FC<{
  movie: z.infer<typeof getPartyByIdResBodySchema>["movies"][number];
  party: string;
}> = ({ movie, party }) => {
  const router = useRouter();

  const [state, dispatch, isPending] = useActionState(
    async (_: unknown, __: FormData) =>
      removeMovieFromWatchlist({
        id: party,
        movie: movie.id,
      }),
    false,
  );

  useEffect(() => {
    if (state) {
      router.refresh();
    }
  }, [state, router]);

  return (
    <MovieCard
      movie={{
        id: movie.id,
        title: movie.title,
        rating: movie.rating,
        images: movie.images,
        release: movie.release,
        language: movie.language,
      }}
      // href={`/parties/${party}/movies/${movie.id}`}
      actions={<RemoveButton onRemove={dispatch} isLoading={isPending} />}
    />
  );
};
