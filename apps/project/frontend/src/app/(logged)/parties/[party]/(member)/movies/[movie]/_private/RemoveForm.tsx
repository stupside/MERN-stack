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
      return removeMovieFromWatchlist({
        id: party,
        movie: movie,
      });
    },
    null,
  );

  useEffect(() => {
    if (state && !state.error) {
      router.push(`/parties/${party}/movies`);
    }
  }, [state, party, router]);

  return (
    <div className="space-y-2">
      <form action={dispatch}>
        <button
          type="submit"
          disabled={isPending}
          className="text-xs text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50 cursor-pointer underline"
        >
          {isPending ? "Removing..." : "Remove from watchlist"}
        </button>
      </form>
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded text-xs">
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
