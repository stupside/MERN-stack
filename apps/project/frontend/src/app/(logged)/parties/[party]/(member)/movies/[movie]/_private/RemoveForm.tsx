"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { removeMovieFromWatchlist } from "../../../../../../../../core/api";

export const RemoveForm: React.FC<{ party: string; movie: number }> = ({
  party,
  movie,
}) => {
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(
    async () => {
      await removeMovieFromWatchlist({
        id: party,
        movie: movie,
      });
      return true;
    },
    false,
  );

  useEffect(() => {
    if (state) {
      router.push(`/parties/${party}/movies`);
    }
  }, [state, party, router]);

  return (
    <form action={dispatch}>
      <button
        type="submit"
        disabled={isPending}
        className="text-xs text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50 cursor-pointer underline"
      >
        {isPending ? "Removing..." : "Remove from watchlist"}
      </button>
    </form>
  );
};
