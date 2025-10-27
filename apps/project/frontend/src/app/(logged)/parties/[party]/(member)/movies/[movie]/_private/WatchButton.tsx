"use client";

import { useRouter } from "next/navigation";
import type { FC } from "react";
import { dispatchEvent } from "apps/project/frontend/src/core";

export const WatchButton: FC<{
  party: string;
  movie: {
    id: number;
    title: string | null;
    poster: string | null;
  };
}> = ({ party, movie }) => {
  const router = useRouter();

  const handleWatch = async () => {
    try {
      // Dispatch the watch event to notify other party members
      await dispatchEvent(
        { id: party },
        {
          type: "watch",
          movie: {
            id: movie.id,
            title: movie.title,
            poster: movie.poster,
          },
        },
      );

      // Navigate to the player
      router.push(`/parties/${party}/movies/${movie.id}/player`);
    } catch (error) {
      console.error("Failed to dispatch watch event:", error);
      // Still navigate even if the notification fails
      router.push(`/parties/${party}/movies/${movie.id}/player`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleWatch}
      className="w-full px-4 py-3 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white text-center font-medium rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
    >
      ▶ Watch Now
    </button>
  );
};