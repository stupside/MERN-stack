"use client";

import { usePlayerSync } from "apps/project/frontend/src/core/hooks/usePlayerSync";
import { type FC, useEffect, useRef, useState } from "react";
import videojs from "video.js";
import type { default as VideoJS } from "video.js/dist/types/player";
import "video.js/dist/video-js.min.css";

export const Player: FC<{
  manifest: string;
}> = ({ manifest }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoJS, setVideoJS] = useState<VideoJS>();

  const { isSyncing } = usePlayerSync({ videoJS });

  // Initialize Video.js
  useEffect(() => {
    if (!videoRef.current) return;

    const player = videojs(videoRef.current, {
      controls: true,
      preload: "auto",
      fluid: true,
      responsive: true,
    });

    setVideoJS(player);

    return () => {
      player.dispose();
    };
  }, []);

  // Load manifest
  useEffect(() => {
    if (!videoJS) return;

    videoJS.src({
      src: manifest,
      type: "application/x-mpegURL",
    });
  }, [manifest, videoJS]);

  return (
    <div className="relative">
      {/** biome-ignore lint/a11y/useMediaCaption: default */}
      <video ref={videoRef} className="video-js vjs-default-skin" playsInline />
      {isSyncing && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-black bg-opacity-70 text-white text-sm rounded-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          Syncing...
        </div>
      )}
    </div>
  );
};
