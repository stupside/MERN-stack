import type { NextPage } from "next";
import { getPartyById } from "../../../../../../core/api";
import { Movies } from "./_private/Movies";

const Page: NextPage<{
  params: Promise<{ party: string }>;
}> = async (props) => {
  const params = await props.params;
  const party = await getPartyById({ id: params.party });

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Watchlist</h2>
      </div>
      <Movies
        party={params.party}
        movies={party.movies}
        searchHref={`/parties/${params.party}/movies/search`}
      />
    </>
  );
};

export default Page;
