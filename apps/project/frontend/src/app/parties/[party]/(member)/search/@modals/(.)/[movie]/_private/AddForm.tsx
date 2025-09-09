"use client";

import { redirect } from "next/navigation";
import { type FC, useActionState, useEffect } from "react";
import { addMovieToWatchlist } from "../action";

export const AddForm: FC<{
  party: string;
  movie: number;
}> = ({ party, movie }) => {
  const [state, dispatch, isPending] = useActionState(
    async (_: unknown, __: FormData) =>
      addMovieToWatchlist({
        id: party,
        movie,
      }),
    false,
  );

  useEffect(() => {
    if (state) {
      redirect(`/parties/${party}/watchlist`);
    }
  }, [state, party]);

  return (
    <form action={dispatch} className="space-y-4">
      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white rounded-lg transition-all font-medium cursor-pointer"
      >
        {isPending ? "Adding..." : "Add to Watchlist"}
      </button>
    </form>
  );
};
