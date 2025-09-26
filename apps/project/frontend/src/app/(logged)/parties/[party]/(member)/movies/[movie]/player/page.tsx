import type { NextPage } from "next";
import { Player } from "./_private/Player";
import { getListeners } from "apps/project/frontend/src/core/api/players/service";

const Page: NextPage<{
  params: Promise<{ party: string; movie: string }>;
}> = async (props) => {
  const params = await props.params;
  const listeners = await getListeners({ id: params.party });

  return (
    <Player
      party={params.party}
      manifest="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
      listeners={listeners}
    />
  );
};

export default Page;
