import type { NextPage } from "next";
import { getPartyById } from "../../../../../../core/api";
import { Movies } from "./_private/Movies";

const Page: NextPage<{
  params: Promise<{ party: string }>;
}> = async (props) => {
  const params = await props.params;
  const party = await getPartyById({ id: params.party });

  if (!party.success || !party.data) {
    return <div>Failed to load party movies</div>;
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Watchlist</h2>
      </div>
      <Movies
        movies={party.data.movies}
        party={params.party}
        searchHref={`/parties/${params.party}/movies/search`}
      />
    </>
  );
};

export default Page;
