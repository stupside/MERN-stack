"use client";

import { RefObject, useEffect, useTransition } from "react";
import type { default as VideoJS } from "video.js/dist/types/player";
import { useEventListeners } from "../../lib";
import { z } from "zod/v4";
import type { dispatchEventReqBodySchema } from "libraries/api/schemas/players";

interface UseSyncPlayerOpts {
  videoJS: RefObject<VideoJS | null>;
  dispatchAction: (
    event: z.infer<typeof dispatchEventReqBodySchema>,
  ) => Promise<void>;
}

export const useSyncPlayer = ({
  videoJS,
  dispatchAction,
}: UseSyncPlayerOpts) => {
  const [isPending, startTransition] = useTransition();
  const [isReceiving, startReceiveTransition] = useTransition();

  // Handle outgoing events (user actions)
  useEffect(() => {
    const handlePlay = async () => {
      // Don't dispatch if we're currently receiving a remote event
      if (isReceiving) return;

      startTransition(async () => {
        await dispatchAction({ type: "movie:play" });
      });
    };

    const handlePause = async () => {
      // Don't dispatch if we're currently receiving a remote event
      if (isReceiving) return;

      startTransition(async () => {
        await dispatchAction({ type: "movie:pause" });
      });
    };

    const handleSeeked = async () => {
      // Don't dispatch if we're currently receiving a remote event
      if (isReceiving) return;

      startTransition(async () => {
        await dispatchAction({
          type: "movie:seek",
          time: videoJS.current?.currentTime() || 0,
        });
      });
    };

    videoJS.current?.on("play", handlePlay);
    videoJS.current?.on("pause", handlePause);
    videoJS.current?.on("seeked", handleSeeked);

    return () => {
      videoJS.current?.off("play", handlePlay);
      videoJS.current?.off("pause", handlePause);
      videoJS.current?.off("seeked", handleSeeked);
    };
  }, [videoJS, isReceiving, dispatchAction]);

  // Handle incoming SSE events using the event library
  useEventListeners({
    "movie:play": async () => {
      // Prevent triggering our own event handlers when receiving remote events
      if (videoJS.current?.paused()) {
        startReceiveTransition(async () => {
          await videoJS.current?.play();
        });
      }
    },
    "movie:pause": () => {
      // Prevent triggering our own event handlers when receiving remote events
      if (!videoJS.current?.paused()) {
        startReceiveTransition(() => {
          videoJS.current?.pause();
        });
      }
    },
    "movie:seek": (detail) => {
      const currentTime = videoJS.current?.currentTime() ?? 0;
      // Only seek if the time difference is significant (more than 1 second)
      // This prevents excessive seeking from minor network delays
      if (Math.abs(currentTime - detail.time) > 1) {
        startReceiveTransition(() => {
          videoJS.current?.currentTime(detail.time);
        });
      }
    },
  });

  const isSyncing = isPending || isReceiving;

  return {
    isSyncing,
  };
};
