import type { NextPage } from "next";
import Link from "next/link";
import { getPartyById } from "../action";
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Watchlist</h2>
        <Link
          href={`/parties/${params.party}/search`}
          className="px-4 py-2 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] font-medium"
        >
          Search Movies
        </Link>
      </div>
      <Movies movies={party.data.movies} party={params.party} />
    </>
  );
};

export default Page;
