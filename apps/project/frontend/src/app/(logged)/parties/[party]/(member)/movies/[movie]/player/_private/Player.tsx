"use client";

import { type FC, useEffect, useRef } from "react";
import videojs from "video.js";
import type { default as VideoJS } from "video.js/dist/types/player";
import "video.js/dist/video-js.min.css";
import { useSSEHistory } from "apps/project/frontend/src/core/hooks/sse/useSSEHistory";
import { useSyncPlayer } from "apps/project/frontend/src/core/hooks/player/useSyncPlayer";
import { useSSEListeners } from "apps/project/frontend/src/core/hooks/sse/useSSEListeners";
import { useSSEStatus } from "apps/project/frontend/src/core/hooks/sse/useSSEStatus";
import { dispatchEvent } from "apps/project/frontend/src/core";

export const Player: FC<{
  party: string;
  manifest: string;
  listeners: Array<{ id: string; name: string }>;
}> = ({ party, manifest, listeners }) => {
  const videoJSRef = useRef<VideoJS>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Clean, focused hooks
  const { users } = useSSEListeners({ listeners });

  const { isSyncing } = useSyncPlayer({
    videoJS: videoJSRef,
    dispatchAction: async (params) => {
      return dispatchEvent({ id: party }, params);
    },
  });

  const { events } = useSSEHistory();
  const { isConnected } = useSSEStatus();

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

        {/* Modern Sync Status Bar - Top of player */}
        {(isSyncing || !isConnected) && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 h-1 z-20">
            {isSyncing && (
              <div className="h-full bg-white animate-pulse opacity-70" />
            )}
          </div>
        )}

        {/* Simple status indicator */}
        <div className="absolute top-3 right-3 z-20">
          <div className="bg-black/80 rounded-full px-3 py-1 flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"}`}
            />
            <span className="text-white text-sm">{users.length} viewers</span>
          </div>
        </div>

        {/* Simple sync indicator */}
        {isSyncing && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-black/90 rounded px-3 py-1 text-white text-sm">
              Syncing...
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

      {/* Simple history */}
      {events.length > 0 && (
        <div className="mt-4 bg-white rounded border border-gray-200">
          <div className="px-3 pb-3 space-y-1">
            {events.slice(0, 10).map((event) => (
              <div key={event.id} className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                  {event.user.name[0]}
                </div>
                <span>{event.user.name}</span>
                <span className="text-gray-600">{event.type}</span>
                <span className="text-gray-400 text-xs ml-auto">
                  {new Date(event.time).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
