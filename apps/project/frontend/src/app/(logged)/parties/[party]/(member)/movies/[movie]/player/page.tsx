import { NextPage } from "next";
import { Player } from "./_private/Player";

const Page: NextPage<{
  params: Promise<{ party: string; movie: string }>;
}> = async () => {
  return (
    <Player
      manifest={
        "https://live-hls-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8"
      }
    />
  );
};

export default Page;
