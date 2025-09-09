import type { NextPage } from "next";
import Link from "next/link";
import { MovieModal } from "../../../../../../../../../core/components/movies";
import { getMovieById } from "./action";
import { RemoveForm } from "./_private/RemoveForm";

const Page: NextPage<{
  params: Promise<{ party: string; movie: string }>;
}> = async (props) => {
  const params = await props.params;

  const movie = await getMovieById({ id: Number.parseInt(params.movie, 10) });
  if (!movie.success || !movie.data) {
    return (
      <div className="fixed inset-0 bg-black/25 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Movie not found
            </h2>
            <p className="text-gray-600 mb-6">
              No movie found with id {params.movie}
            </p>
            <Link
              href={`/parties/${params.party}/watchlist`}
              className="block w-full px-4 py-2 text-center text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
            >
              Close
            </Link>
          </div>
        </div>
      </div>
    );
  }
  if (!movie.data) {
    return <div>Unexpected error</div>;
  }

  return (
    <MovieModal
      movie={movie.data}
      actions={<RemoveForm party={params.party} movie={movie.data.ref} />}
      closeHref={`/parties/${params.party}/watchlist`}
      playerHref={`/parties/${params.party}/watchlist/${movie.data.ref}/player`}
    />
  );
};

export default Page;