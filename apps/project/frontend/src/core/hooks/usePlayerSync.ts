"use client";

import { useEffect, useTransition } from "react";
import type { default as VideoJS } from "video.js/dist/types/player";
import { usePlayerContext } from "../contexts";
import { useEventListeners } from "../lib";

interface PlayerSyncOptions {
  videoJS?: VideoJS;
  enabled?: boolean;
}

export const usePlayerSync = ({ videoJS }: PlayerSyncOptions) => {
  const [isPending, startTransition] = useTransition();
  const { dispatchEvent, isConnected } = usePlayerContext();

  // Handle outgoing events (user actions)
  useEffect(() => {
    const handlePlay = async () => {
      startTransition(async () => {
        await dispatchEvent({ type: "movie:play" });
      });
    };

    const handlePause = async () => {
      startTransition(async () => {
        await dispatchEvent({ type: "movie:pause" });
      });
    };

    const handleSeeked = async () => {
      startTransition(async () => {
        await dispatchEvent({
          type: "movie:seek",
          time: videoJS?.currentTime() || 0,
        });
      });
    };

    videoJS?.on("play", handlePlay);
    videoJS?.on("pause", handlePause);
    videoJS?.on("seeked", handleSeeked);

    return () => {
      videoJS?.off("play", handlePlay);
      videoJS?.off("pause", handlePause);
      videoJS?.off("seeked", handleSeeked);
    };
  }, [videoJS, dispatchEvent]);

  // Handle incoming SSE events using the event library
  useEventListeners({
    "movie:play": () => videoJS?.play(),
    "movie:pause": () => videoJS?.pause(),
    "movie:seek": (detail) => videoJS?.currentTime(detail.time),
  });

  return {
    isSyncing: isPending,
    isConnected,
  };
};
