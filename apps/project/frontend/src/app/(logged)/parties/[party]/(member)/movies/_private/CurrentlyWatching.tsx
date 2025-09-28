"use client";

import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

interface CurrentlyWatchingProps {
  watching: {
    movie: {
      id: number;
      title: string | null;
      poster: string | null;
    };
    initiator: {
      id: string;
      name: string;
    };
    timestamp: number;
  };
  partyId: string;
}

export const CurrentlyWatching: FC<CurrentlyWatchingProps> = ({
  watching,
  partyId,
}) => {
  return (
    <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-4">
        {/* Movie Poster */}
        <div className="flex-shrink-0 w-16 h-24 bg-gray-100 rounded overflow-hidden">
          {watching.movie.poster ? (
            <Image
              src={watching.movie.poster}
              alt={`${watching.movie.title} poster`}
              width={64}
              height={96}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-xl">🎬</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-red-700 mb-1">
                {watching.initiator.name} is watching
              </p>
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {watching.movie.title || "Untitled Movie"}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Started {new Date(watching.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0">
          <Link
            href={`/parties/${partyId}/movies/${watching.movie.id}/player`}
            className="px-4 py-2 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white text-sm font-medium rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Join {watching.initiator.name}
          </Link>
        </div>
      </div>
    </div>
  );
};