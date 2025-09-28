"use client";

import "video.js/dist/video-js.min.css";

import { type FC, useEffect, useRef } from "react";
import videojs from "video.js";
import type { default as VideoJS } from "video.js/dist/types/player";

import { dispatchEvent } from "apps/project/frontend/src/core";
import { useSyncPlayer } from "apps/project/frontend/src/core/hooks/useSyncPlayer";

export const Player: FC<{
  party: string;
  isOwner: boolean;
  manifest: string;
}> = ({ party, manifest, isOwner }) => {
  const videoJSRef = useRef<VideoJS>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { syncing, buffering, isConnected } = useSyncPlayer({
    owner: isOwner,
    videoJS: videoJSRef,
    dispatch: async (params) => {
      return dispatchEvent({ id: party }, params);
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
    <div>
      <div className="relative bg-black rounded-lg overflow-hidden">
        {/** biome-ignore lint/a11y/useMediaCaption: default */}
        <video
          ref={videoRef}
          className="video-js vjs-default-skin w-full"
          playsInline
        />

        {/* Sync Status Bar - Top of player */}
        {(syncing || !isConnected || buffering) && (
          <div className="absolute top-0 left-0 right-0 h-1 z-20">
            <div className={`h-full ${!isConnected
              ? "bg-red-500"
              : buffering
                ? "bg-yellow-500"
                : "bg-green-500"
              }`}>
              {(syncing || buffering) && (
                <div className="h-full bg-white animate-pulse opacity-70" />
              )}
            </div>
          </div>
        )}

        {/* Enhanced status indicator with ownership */}
        <div className="absolute top-3 right-3 z-20">
          <div className="bg-black/80 rounded-lg px-3 py-2 flex items-center gap-3">
            {/* Owner crown indicator */}
            {isOwner && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-sm">👑</span>
                <span className="text-yellow-400 text-xs font-medium">
                  OWNER
                </span>
              </div>
            )}

          </div>
        </div>

        {/* Sync indicator */}
        {(syncing || buffering) && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-black/90 rounded px-3 py-1 text-white text-sm flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${buffering ? "bg-yellow-400" : "bg-blue-400"
                }`} />
              {buffering
                ? "Buffering..."
                : isOwner
                  ? "Broadcasting..."
                  : "Syncing..."
              }
            </div>
          </div>
        )}

        {/* Non-owner waiting state */}
        {!isOwner && !isConnected && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-black/90 rounded px-3 py-1 text-white text-sm">
              👑 Waiting for party owner...
            </div>
          </div>
        )}

        {/* Connection lost warning */}
        {!isConnected && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30">
            <div className="text-white text-center">
              <div className="text-lg mb-2">⚠️</div>
              <div>Connection lost</div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
