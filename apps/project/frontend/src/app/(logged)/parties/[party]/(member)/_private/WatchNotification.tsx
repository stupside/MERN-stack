"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import type { FC } from "react";

interface WatchNotificationProps {
  movie: {
    id: number;
    title: string | null;
    poster: string | null;
  };
  owner: {
    id: string;
    name: string;
  };
  party: string;
  onDismiss: () => void;
}

export const WatchNotification: FC<WatchNotificationProps> = ({
  movie,
  owner,
  party,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(false);



  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    setTimeout(onDismiss, 300); // Wait for slide-out animation
  }, [onDismiss]);

  useEffect(() => {
    // Slide in animation
    setIsVisible(true);

    // Auto-dismiss after 8 seconds
    const timer = setTimeout(() => {
      handleDismiss();
    }, 8000);

    return () => clearTimeout(timer);
  }, [handleDismiss]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
    >
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm w-full">
        <div className="flex items-start gap-3">
          {/* Movie Poster */}
          <div className="flex-shrink-0 w-12 h-16 bg-gray-100 rounded overflow-hidden">
            {movie.poster ? (
              <Image
                src={movie.poster}
                alt={`${movie.title} poster`}
                width={48}
                height={64}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-lg">🎬</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {owner.name} started watching
                </p>
                <p className="text-sm text-gray-700 truncate font-medium">
                  {movie.title || "Untitled Movie"}
                </p>
              </div>
              <button
                type="button"
                onClick={handleDismiss}
                className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {/** biome-ignore lint/a11y/noSvgWithoutTitle: ignore */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="mt-3 flex gap-2">
              <Link
                href={`/parties/${party}/movies/${movie.id}/player`}
                className="flex-1 px-3 py-2 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white text-xs font-medium rounded transition-all text-center"
                onClick={handleDismiss}
              >
                Join Owner
              </Link>
              <button
                type="button"
                onClick={handleDismiss}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 text-xs font-medium transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};