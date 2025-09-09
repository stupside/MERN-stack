"use client";

import { useActionState, useEffect } from "react";
import { redirect } from "next/navigation";
import { removeMovieFromWatchlist } from "../../../action";

export const RemoveForm: React.FC<{ party: string; movie: number }> = ({ party, movie }) => {

  const [state, dispatch, isPending] = useActionState(
    async (_: unknown, __: FormData) =>
      removeMovieFromWatchlist({
        id: party,
        movie: movie
      }),
    false
  );

  useEffect(() => {
    if (state) {
      redirect(`/parties/${party}/movies`);
    }
  }, [state, party]);

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