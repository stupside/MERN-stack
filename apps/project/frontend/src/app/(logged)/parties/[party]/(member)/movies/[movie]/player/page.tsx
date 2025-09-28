import type { NextPage } from "next";
import { Player } from "./_private/Player";
import { getPartyById, info as getUserInfo } from "apps/project/frontend/src/core";

const Page: NextPage<{
  params: Promise<{ party: string; movie: string }>;
}> = async (props) => {
  const params = await props.params;

  const me = await getUserInfo();

  const party = await getPartyById({ id: params.party });

  return (
    <Player
      party={params.party}
      isOwner={party.owner.id === me.id}
      manifest="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
    />
  );
};

export default Page;
