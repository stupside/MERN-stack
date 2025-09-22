"use client";

import { type FC, useEffect, useRef, useState } from "react";

import videojs from "video.js";

import type { default as VideoJS } from "video.js/dist/types/player";
import "video.js/dist/video-js.min.css";

export const Player: FC<{
  manifest: string;
}> = ({ manifest }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoJS, setVideoJS] = useState<VideoJS>();

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    const player = videojs(videoRef.current, {
      controls: true,
      preload: "auto",
      fluid: true,
      responsive: true,
    });

    setVideoJS(player);
  }, []);

  useEffect(() => {
    if (!videoJS) {
      return;
    }

    videoJS.src({
      src: manifest,
      type: "application/x-mpegURL",
    });

    return () => {
      videoJS.dispose();
      setVideoJS(undefined);
    }
  }, [manifest, videoJS]);

  return (
    <>
      {/** biome-ignore lint/a11y/useMediaCaption: ignore */}
      <video
        ref={videoRef}
        className="video-js vjs-default-skin"
        playsInline
      />

    </>
  );
};
