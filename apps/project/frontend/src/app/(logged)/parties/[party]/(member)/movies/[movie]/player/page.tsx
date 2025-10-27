import type { NextPage } from "next";
import { Player } from "./_private/Player";
import { getPartyById, info as getUserInfo } from "apps/project/frontend/src/core";

const Page: NextPage<{
  params: Promise<{ party: string; movie: string }>;
}> = async (props) => {
  const params = await props.params;

  const me = await getUserInfo();
  if (me.error) {
    return <div className="container mx-auto px-6 py-8">{me.error.map((error) => <div key={error.path}>{error.message}</div>)}</div>;
  }
  if (!me.value) {
    throw new Error("User not found");
  }

  const party = await getPartyById({ id: params.party });
  if (party.error) {
    return <div className="container mx-auto px-6 py-8">{party.error.map((error) => <div key={error.path}>{error.message}</div>)}</div>;
  }
  if (!party.value) {
    throw new Error("Party not found");
  }

  return (
    <Player
      party={params.party}
      isOwner={party.value.owner.id === me.value.id}
      manifest="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
    />
  );
};

export default Page;
