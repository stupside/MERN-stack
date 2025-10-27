"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addMovieToWatchlist } from "../../../../../../../../../core/api";

export const AddForm: React.FC<{ party: string; movie: number }> = ({
  party,
  movie,
}) => {
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(
    async () => {
      return addMovieToWatchlist({
        id: party,
        movie: movie,
      });
    },
    null,
  );

  useEffect(() => {
    if (state && !state.error) {
      router.push(`/parties/${party}/movies/search`);
    }
  }, [state, party, router]);

  return (
    <div className="space-y-3">
      <form action={dispatch}>
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-6 py-3 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 disabled:from-red-300 disabled:to-pink-400 text-white font-medium rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          {isPending ? "Adding to Watchlist..." : "Add to Watchlist"}
        </button>
      </form>
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {state.error.map((err) => (
            <div key={err.path}>
              <span className="font-medium">{err.path ? `${err.path}: ` : ""}</span>
              {err.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
