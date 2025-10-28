"use client";

import "video.js/dist/video-js.min.css";

import Link from "next/link";
import { type FC, useEffect, useRef } from "react";
import videojs from "video.js";
import type { default as VideoJS } from "video.js/dist/types/player";

import { dispatchEvent } from "apps/project/frontend/src/core";
import { useSyncPlayer } from "apps/project/frontend/src/core/hooks/useSyncPlayer";

interface Movie {
  ref: number;
  title: string | null;
  rating: number | null;
  release: string | null;
  overview: string | null;
  language: string | null;
  genres: Array<{ ref: number; name: string }>;
  images: {
    backdrop: string | null;
    poster: string | null;
  };
  production: Array<{ name: string }>;
}

export const Player: FC<{
  party: string;
  partyName: string;
  isOwner: boolean;
  ownerName: string;
  movie: Movie;
  manifest: string;
}> = ({ party, partyName, manifest, isOwner, ownerName, movie }) => {
  const videoJSRef = useRef<VideoJS>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { syncing, buffering, isConnected } = useSyncPlayer({
    owner: isOwner,
    videoJS: videoJSRef,
    dispatch: async (params) => {
      await dispatchEvent({ id: party }, params);
    },
  });

  // Initialize Video.js after component mounts
  useEffect(() => {
    if (!videoRef.current) return;

    const timer = setTimeout(() => {
      if (!videoRef.current) return;

      const player = videojs(videoRef.current, {
        controls: true,
        preload: "auto",
        fluid: true,
        responsive: true,
      });

      player.src({
        src: manifest,
        type: "application/x-mpegURL",
      });

      videoJSRef.current = player;
    }, 0);

    return () => {
      clearTimeout(timer);
      if (!videoJSRef.current?.isDisposed()) {
        videoJSRef.current?.dispose();
      }
    };
  }, [manifest]);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <Link
            href={`/parties/${party}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to {partyName}
          </Link>

          <div className="flex items-center gap-3">
            {isOwner && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-red-400 to-pink-500 px-3 py-1.5 rounded-lg">
                <span className="text-white text-sm">👑</span>
                <span className="text-white text-sm font-medium">Host</span>
              </div>
            )}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex items-center gap-2 px-3 py-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500 animate-pulse"}`} />
              <span className="text-gray-800 text-sm font-medium">
                {isConnected ? "Live" : "Connecting..."}
              </span>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-xl font-medium text-gray-900">{movie.title || "Untitled"}</h1>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
              {movie.release && (
                <span>{new Date(movie.release).getFullYear()}</span>
              )}
              {movie.rating && (
                <div className="flex items-center gap-1">
                  {/** biome-ignore lint/a11y/noSvgWithoutTitle: decorative */}
                  <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{movie.rating.toFixed(1)}</span>
                </div>
              )}
              {movie.genres.length > 0 && (
                <span className="text-gray-500">{movie.genres.slice(0, 3).map(g => g.name).join(", ")}</span>
              )}
            </div>
          </div>
          {!isOwner && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-5 h-5 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {ownerName.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-gray-600">
                {ownerName}
              </span>
            </div>
          )}
        </div>

        {/* Video Player */}
        <div className="relative bg-black rounded-lg overflow-hidden shadow-sm">
          {/** biome-ignore lint/a11y/useMediaCaption: default */}
          <video
            ref={videoRef}
            className="video-js vjs-default-skin w-full"
            playsInline
          />

          {/* Sync Status Bar - Top of player */}
          {(syncing || buffering) && (
            <div className="absolute top-0 left-0 right-0 h-1 z-20">
              <div className={`h-full ${buffering ? "bg-yellow-500" : "bg-gradient-to-r from-red-400 to-pink-500"}`}>
                <div className="h-full bg-white animate-pulse opacity-70" />
              </div>
            </div>
          )}

          {/* Sync indicator */}
          {(syncing || buffering) && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-black/90 rounded-lg px-4 py-2 text-white text-sm flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${buffering ? "bg-yellow-400" : "bg-pink-400"}`} />
                {buffering
                  ? "Buffering..."
                  : isOwner
                    ? "Broadcasting..."
                    : "Syncing with host..."
                }
              </div>
            </div>
          )}

          {/* Connection lost warning */}
          {!isConnected && (
            <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-30">
              <div className="text-white text-center">
                <div className="text-4xl mb-4">⚠️</div>
                <div className="text-xl font-medium mb-2">Connection Lost</div>
                <div className="text-gray-400">
                  {isOwner ? "Reconnecting to party..." : `Waiting for ${ownerName} to reconnect...`}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
