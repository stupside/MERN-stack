import { type FC, useEffect, useRef, useState } from "react";

export const Player: FC<{
    title: string;
    tmdbId: string;
}> = (props) => {

    const url = `https://vidlink.pro/movie/${props.tmdbId}`;

    const refIframe = useRef<HTMLIFrameElement>(null);
    const [video, setVideo] = useState<HTMLVideoElement>();

    useEffect(() => {
        if (refIframe.current) {
            const video = refIframe.current.contentDocument?.querySelector("video");
            if (video) {
                setVideo(video);
            }
        }
    }, []);

    useEffect(() => {

        const onPlay = () => {
            console.log("play");
        }

        const onPause = () => {
            console.log("pause");
        }

        const onError = () => {
            console.log("error");
        }

        const onWaiting = () => {
            console.log("waiting");
        }

        if (video) {
            video.addEventListener("play", onPlay);
            video.addEventListener("pause", onPause);
            video.addEventListener("error", onError);
            video.addEventListener("waiting", onWaiting);
        }

        return () => {
            if (video) {
                video.removeEventListener("play", onPlay);
                video.removeEventListener("pause", onPause);
                video.removeEventListener("error", onError);
                video.removeEventListener("waiting", onWaiting);
            }
        }
    }, [video]);

    return <iframe ref={refIframe} title={props.title} src={url} width="100%" height="100%" allowFullScreen />
}