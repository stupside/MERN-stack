"use client";

import { type RefObject, useEffect, useState, useTransition } from "react";
import type { z } from "zod/v4";
import type { default as VideoJS } from "video.js/dist/types/player";
import type { dispatchEventSchema } from "libraries/api/schemas/players";
import { useSSE } from "./useSSE";

interface Options {
  videoJS: RefObject<VideoJS | null>;
  dispatch: (event: z.infer<typeof dispatchEventSchema.body>) => Promise<void>;
  owner: boolean;
}

export const useSyncPlayer = ({ videoJS, dispatch, owner }: Options) => {
  const [syncing, startSync] = useTransition();
  const [buffering, setBuffering] = useState(false);
  const [lastSync, setLastSync] = useState(0);

  const syncTime = (targetTime: number, eventTimestamp: number, shouldPlay?: boolean, isAction = false) => {
    if (owner || !videoJS.current) return;

    const now = Date.now();

    // Debounce non-action syncs to prevent jitter
    if (!isAction && now - lastSync < 500) return;

    // Compensate for network latency
    const networkDelay = (now - eventTimestamp) / 1000;
    const compensatedTime = targetTime + networkDelay;

    const currentTime = videoJS.current.currentTime() || 0;
    const drift = Math.abs(currentTime - compensatedTime);

    // Smarter thresholds
    const threshold = isAction ? 0.1 : 0.5;
    const majorDrift = 2.0;

    if (drift > majorDrift || (drift > threshold)) {
      // Preserve play state during sync
      const wasPlaying = !videoJS.current.paused();

      // Set time
      videoJS.current.currentTime(compensatedTime);

      // Restore or set play state
      if (shouldPlay !== undefined) {
        if (shouldPlay && videoJS.current.paused()) {
          videoJS.current.play();
        } else if (!shouldPlay && !videoJS.current.paused()) {
          videoJS.current.pause();
        }
      } else if (wasPlaying && videoJS.current.paused()) {
        // Restore previous state if no explicit state given
        videoJS.current.play();
      }

      setLastSync(now);
    }
  };

  // Send events based on permissions
  useEffect(() => {
    if (!videoJS.current) return;

    const send = (type: "play" | "pause" | "seek") => {
      if (syncing) return;
      startSync(async () => {
        await dispatch({ type, time: videoJS.current?.currentTime() || 0 });
      });
    };

    // Only owner can play, anyone can pause
    const onPlay = () => {
      if (owner) send("play");
    };
    const onPause = () => send("pause");

    const onSeek = () => {
      if (owner && videoJS.current) {
        const isPlaying = !videoJS.current.paused();
        startSync(async () => {
          await dispatch({
            type: "seek",
            time: videoJS.current?.currentTime() || 0,
            playing: isPlaying,
          });
        });
      }
    };

    const onCanPlay = () => {
      if (owner) {
        setBuffering(false);
        dispatch({ type: "buffer", state: "ready" }).catch(console.error);
      }
    };

    const onWaiting = () => {
      if (owner) {
        setBuffering(true);
        dispatch({ type: "buffer", state: "wait" }).catch(console.error);
      }
    };

    videoJS.current?.on("play", onPlay);
    videoJS.current?.on("pause", onPause);
    videoJS.current?.on("seeked", onSeek);
    videoJS.current?.on("waiting", onWaiting);
    videoJS.current?.on("canplay", onCanPlay);

    return () => {
      videoJS.current?.off("play", onPlay);
      videoJS.current?.off("pause", onPause);
      videoJS.current?.off("seeked", onSeek);
      videoJS.current?.off("waiting", onWaiting);
      videoJS.current?.off("canplay", onCanPlay);
    };
  }, [owner, videoJS, dispatch, syncing]);

  // Owner heartbeat
  useEffect(() => {
    if (!owner || !videoJS.current) return;

    const interval = setInterval(() => {
      if (videoJS.current) {
        dispatch({
          type: "sync",
          time: videoJS.current.currentTime() || 0,
          playing: !videoJS.current.paused(),
        }).catch(console.error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [owner, videoJS, dispatch]);

  const { isConnected, users } = useSSE({
    "player:play": () => {
      if (!owner && videoJS.current?.paused()) {
        videoJS.current.play();
      }
    },
    "player:pause": () => {
      if (!owner && !videoJS.current?.paused()) {
        videoJS.current?.pause();
      }
    },
    "player:seek": (event) => {
      syncTime(event.time, event.timestamp, event.playing, true);
    },
    "player:sync": (event) => {
      syncTime(event.time, event.timestamp, event.playing, false);
    },
    "player:buffer": (event) => {
      setBuffering(event.state === "wait");
    },
  });

  return { syncing, buffering, isConnected, users };
};