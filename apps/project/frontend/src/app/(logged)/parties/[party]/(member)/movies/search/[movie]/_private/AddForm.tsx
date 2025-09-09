"use client";

import { useActionState, useEffect } from "react";
import { redirect } from "next/navigation";
import { addMovieToWatchlist } from "../../../../../../../../../core/api";

export const AddForm: React.FC<{ party: string; movie: number }> = ({ party, movie }) => {

  const [state, dispatch, isPending] = useActionState(
    async (_: unknown, __: FormData) =>
      addMovieToWatchlist({
        id: party,
        movie: movie
      }),
    false
  );

  useEffect(() => {
    if (state) {
      redirect(`/parties/${party}/watchlist`);
    }
  }, [state, party]);

  return (
    <form action={dispatch}>
      <button
        type="submit"
        disabled={isPending}
        className="w-full px-6 py-3 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 disabled:from-red-300 disabled:to-pink-400 text-white font-medium rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
      >
        {isPending ? "Adding to Watchlist..." : "Add to Watchlist"}
      </button>
    </form>
  );
};