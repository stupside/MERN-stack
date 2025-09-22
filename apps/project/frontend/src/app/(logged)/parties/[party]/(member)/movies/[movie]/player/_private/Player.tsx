"use client";

import Hls from "hls.js";
import { type FC, useEffect, useRef } from "react";

export const Player: FC<{
  manifest: string;
}> = ({ manifest }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(manifest);
      hls.attachMedia(videoRef.current);
      return () => {
        hls.destroy();
      };
    }
  }, [manifest]);

  return (
    <video
      title="Movie Player"
      ref={videoRef}
      controls
      className="w-full h-full bg-black"
      autoPlay
      playsInline
    >
      <track kind="captions" />
    </video>
  );
};
