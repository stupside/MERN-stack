import type { NextPage } from "next";
import { getPartyById } from "../../../../../../core/api";
import { Movies } from "./_private/Movies";
import { WatchingStatus } from "./_private/WatchingStatus";

const Page: NextPage<{
  params: Promise<{ party: string }>;
}> = async (props) => {
  const params = await props.params;

  const party = await getPartyById({ id: params.party });
  if (party.error) {
    return <div className="container mx-auto px-6 py-8">{party.error.map((error) => <div key={error.path}>{error.message}</div>)}</div>;
  }
  if (!party.value) {
    throw new Error("Party not found");
  }

  return (
    <>
      <WatchingStatus partyId={params.party} />
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Watchlist</h2>
      </div>
      <Movies
        party={params.party}
        movies={party.value.movies}
        searchHref={`/parties/${params.party}/movies/search`}
      />
    </>
  );
};

export default Page;
