import type { NextPage } from "next";

import { getMovieById, getPartyById, info as getUserInfo } from "apps/project/frontend/src/core";
import { Player } from "./_private/Player";

const Page: NextPage<{
  params: Promise<{ party: string; movie: string }>;
}> = async (props) => {
  const params = await props.params;

  const [me, party, movie] = await Promise.all([
    getUserInfo(),
    getPartyById({ id: params.party }),
    getMovieById({ id: Number(params.movie) }),
  ]);

  if (me.error) {
    return <div className="container mx-auto px-6 py-8">{me.error.map((error) => <div key={error.path}>{error.message}</div>)}</div>;
  }
  if (!me.value) {
    throw new Error("User not found");
  }

  if (party.error) {
    return <div className="container mx-auto px-6 py-8">{party.error.map((error) => <div key={error.path}>{error.message}</div>)}</div>;
  }
  if (!party.value) {
    throw new Error("Party not found");
  }

  if (movie.error) {
    return <div className="container mx-auto px-6 py-8">{movie.error.map((error) => <div key={error.path}>{error.message}</div>)}</div>;
  }
  if (!movie.value) {
    throw new Error("Movie not found");
  }

  return (
    <Player
      party={params.party}
      partyName={party.value.name}
      isOwner={party.value.owner.id === me.value.id}
      ownerName={party.value.owner.name}
      movie={movie.value}
      manifest="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
    />
  );
};

export default Page;
