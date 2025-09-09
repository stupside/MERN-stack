import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { getMovieById } from "../../../../../../../core/api";
import { RemoveForm } from "./_private/RemoveForm";

const Page: NextPage<{
  params: Promise<{ party: string; movie: string }>;
}> = async (props) => {
  const params = await props.params;

  const movie = await getMovieById({ id: Number.parseInt(params.movie, 10) });
  if (!movie.success || !movie.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Movie not found
          </h2>
          <p className="text-gray-600 mb-6">
            No movie found with id {params.movie}
          </p>
          <Link
            href={`/parties/${params.party}/movies`}
            className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
          >
            ← Back to Movies
          </Link>
        </div>
      </div>
    );
  }
  if (!movie.data) {
    return <div>Unexpected error</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href={`/parties/${params.party}/movies`}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to movies
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {movie.data.images?.poster && (
            <div className="flex-shrink-0">
              <div className="w-64 h-96 overflow-hidden rounded-lg relative mb-4">
                <Image
                  src={movie.data.images.poster}
                  alt={`${movie.data.title || "Movie"} poster`}
                  fill
                  className="object-cover"
                />
              </div>
              <Link
                href={`/parties/${params.party}/movies/${movie.data.ref}/player`}
                className="w-full px-4 py-3 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white text-center font-medium rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] block"
              >
                ▶ Watch Now
              </Link>
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {movie.data.title || "Untitled"}
            </h1>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-6 text-lg text-gray-600">
                {movie.data.release && (
                  <span>{new Date(movie.data.release).getFullYear()}</span>
                )}
                {movie.data.rating && (
                  <span>★ {movie.data.rating.toFixed(1)}</span>
                )}
                {movie.data.language && (
                  <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded uppercase font-medium">
                    {movie.data.language}
                  </span>
                )}
              </div>

              {movie.data.genres && movie.data.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.data.genres.map((genre, index) => (
                    <span
                      key={typeof genre === 'string' ? genre : genre.id || index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {typeof genre === 'string' ? genre : genre.name}
                    </span>
                  ))}
                </div>
              )}

              {movie.data.overview && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Overview</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {movie.data.overview}
                  </p>
                </div>
              )}

              {movie.data.production && movie.data.production.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Production Companies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.data.production.map((company) => (
                      <span
                        key={company.id}
                        className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full"
                      >
                        {company.company}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-gray-200">
              <RemoveForm party={params.party} movie={movie.data.ref} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;