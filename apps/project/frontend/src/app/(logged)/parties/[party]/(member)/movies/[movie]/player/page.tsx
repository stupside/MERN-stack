import type { NextPage } from "next";
import { Player } from "./_private/Player";

const Page: NextPage<{
  params: Promise<{ party: string; movie: string }>;
}> = async () => {
  return (
    <Player
      manifest={
        "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
      }
    />
  );
};

export default Page;
